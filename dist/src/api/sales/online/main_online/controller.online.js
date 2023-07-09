"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderByStaff = exports.updateOrderByAdmin = exports.updateOrderByStaff = exports.handleTransferOrder = exports.transferOrder = exports.getManyOrderByUser = exports.getManyOrderByStaff = exports.getOneOrderByUser = exports.getOneOrderByStaff = exports.processOrder = exports.acceptOrder = exports.verifyOnlineSales = exports.checkOutSales = exports.createOnlineSales = void 0;
const interface_online_1 = require("../interface_online/interface.online");
const custom_error_1 = require("../../../../utilities/custom_error");
const http_response_1 = require("../../../../utilities/http_response");
const model_cart_1 = require("../../../user/cart/main_cart/model.cart");
const service_online_1 = require("./service.online");
const number_checker_1 = require("../../../../utilities/number_checker");
const model_product_1 = require("../../../product/main_product/model.product");
const id_generator_1 = require("../../../../utilities/id_generator");
const interface_sales_1 = require("../../interface_sales/interface.sales");
const id_gen_interface_1 = require("../../../../utilities/interface_utilities/id_gen.interface");
const model_vat_1 = require("../../../admin/vat/main_vat/model.vat");
const interface_vat_1 = require("../../../admin/vat/interface_vat/interface.vat");
const model_online_1 = require("./model.online");
const index_payment_1 = require("../../../../utilities/payment/index.payment");
const model_dispatch_1 = require("../../../admin/dispatch/main_dispatch/model.dispatch");
const model_branch_1 = require("../../../admin/branch/main_branch/model.branch");
const interface_branch_1 = require("../../../admin/branch/interface_branch/interface.branch");
const model_staff_1 = require("../../../admin/staff/main_staff/model.staff");
const model_auth_1 = require("../../../auth/main_auth/model.auth");
const general_factory_1 = require("../../../general_factory/interface/general_factory");
const model_notification_1 = require("../../../notification/main_notification/model.notification");
const model_review_1 = require("../../../review/main_review/model.review");
const model_profile_1 = require("../../../user/profile/main_profile/model.profile");
const crud_1 = require("../../../general_factory/crud");
const factory_online_1 = require("./factory.online");
const factory_auth_1 = require("../../../auth/main_auth/factory.auth");
const factory_address_1 = require("../../../user/address/main_address/factory.address");
const factory_cart_1 = require("../../../user/cart/main_cart/factory.cart");
// 1) create a post online order ✅done
// 2) the dispatch rider should be able to maintain the messages on the order dispatch update
// 3) update general update status with update clearance
// 4) get all orders by staff
// 5) get all orders by user
// 6) get one order by staff or user
// 7) customer should be able to review product after purchase ✅done
// meaning we can create a new review of the product and review it ✅done
const createOnlineSales = async (request, response, next) => {
    try {
        const body = request.body;
        const user = request.user;
        const checkOut = await (0, factory_online_1.handleCheckOut)(body, user);
        return response.redirect(http_response_1.HTTP_RESPONSE.CONTINUE, checkOut);
    }
    catch (error) {
        next(error);
    }
};
exports.createOnlineSales = createOnlineSales;
const checkOutSales = async (request, response, next) => {
    try {
        const body = request.body;
        const user = request.headers.authorization
            ? await (0, factory_auth_1.protectorFunction)(request)
            : (await (0, factory_auth_1.signupFactory)(request, body.user)).newUSER;
        if (!user)
            throw (0, custom_error_1.APP_ERROR)("no user defined");
        const add_address = await (0, factory_address_1.createAddressFactory)(body.address, user);
        const add_cart = await (0, factory_cart_1.addCartFunction)(body.products, user);
        const handle_checkout = await (0, factory_online_1.handleCheckOut)({ cart_items: add_cart, address: add_address.id }, user);
        return response.redirect(http_response_1.HTTP_RESPONSE.CONTINUE, handle_checkout);
    }
    catch (error) {
        next(error);
    }
};
exports.checkOutSales = checkOutSales;
const verifyOnlineSales = async (request, response, next) => {
    // 1) get the url message from  Paystack ✅done
    // 2) change the order status ✅done
    // 3) clear cart ✅done
    // 4) update order information ✅done
    // 5) alert the branch manager about the OrderTypeE ✅done
    // 6) create a review schema ✅done
    try {
        // get the body of the webhook from paystack
        const data = request.body.data;
        const get_ref = data.reference;
        //1) check and verify paystack reference and fetch the data
        const paystack = index_payment_1.PaymentIndex.paystack;
        const pay = new paystack();
        const check_if_hash = pay.verifyPaystackHash(request.headers, request.body);
        if (!check_if_hash)
            throw (0, custom_error_1.APP_ERROR)("this is not a valid paystack link");
        const check_paystack = await pay.verifyPayment(get_ref);
        const get_the_data = check_paystack.data.data;
        const get_trans_status = get_the_data.status;
        const order_id = get_the_data.reference;
        const find_one_order_with_ref_id = await model_online_1.ONLINE_ORDER.findOne({
            order_id,
        });
        if (find_one_order_with_ref_id) {
            //2) lets handle the failed aspect first because thats is easier
            switch (get_trans_status) {
                case "failed":
                    {
                        find_one_order_with_ref_id.payment_status = interface_sales_1.PaymentStatusE.DECLINED;
                        const message = (0, service_online_1.customMessage)({
                            information: "payment failed",
                            title: "payment status",
                            message_type: interface_online_1.MessageTypeE.TEXT,
                        });
                        find_one_order_with_ref_id.message.push(message);
                    }
                    break;
                case "ongoing":
                    find_one_order_with_ref_id.payment_status = interface_sales_1.PaymentStatusE.PROCESSING;
                    break;
                case "abandoned":
                    {
                        find_one_order_with_ref_id.payment_status = interface_sales_1.PaymentStatusE.DECLINED;
                        const message = (0, service_online_1.customMessage)({
                            information: "payment cancelled by user",
                            title: "payment failed",
                            message_type: interface_online_1.MessageTypeE.TEXT,
                        });
                        find_one_order_with_ref_id.message.push(message);
                    }
                    break;
                case "success":
                    {
                        find_one_order_with_ref_id.payment_status = interface_sales_1.PaymentStatusE.APPROVED;
                        find_one_order_with_ref_id.order_status =
                            interface_online_1.OnlineOrderStatusE.PAYMENT_SUCCESSFUL;
                        const message = (0, service_online_1.customMessage)({
                            information: `thank you for your patronage \n your order id is :${order_id} \n preparing your package for shipping`,
                            title: "payment process approved",
                            message_type: interface_online_1.MessageTypeE.TEXT,
                        });
                        find_one_order_with_ref_id.message.push(message);
                        //b) send notification to the online branch admin
                        // b.a) find the branches i.e online branches
                        const get_branches = await model_branch_1.BRANCH.find({
                            branch_type: interface_branch_1.BranchTypeE.ONLINE,
                        });
                        const users = await model_auth_1.USER.find({
                            permissions: { $elemMatch: general_factory_1.PermissionsE.HANDLE_ONLINE_ORDER },
                        });
                        //b.b lets gets staff members with this users
                        const staffs = [];
                        for (const user of users) {
                            const staff = await model_staff_1.STAFF.findOne({ user: user.id });
                            if (staff) {
                                //send notification to staffs members
                                await model_notification_1.NOTIFICATION.create({
                                    user: user.id,
                                    message_type: interface_online_1.MessageTypeE.TEXT,
                                    title: `new online order with order_id: ${order_id} `,
                                });
                            }
                        }
                        // const find_online_staff_handlers = await STAFF.find()
                        //c) update cart_order, remove cart items
                        const products = find_one_order_with_ref_id.products;
                        for (const cart_item of products) {
                            //c.a remove from cart and update price
                            const find_cart = await model_cart_1.CART.findOne({
                                user: find_one_order_with_ref_id.user.id,
                            });
                            if (find_cart) {
                                const cart_product = find_cart.products.findIndex((prd) => prd.id === cart_item.product.id);
                                const find_vat = await model_vat_1.VAT.findOne({ vat_name: interface_vat_1.VatE.ONLINE });
                                find_cart.products.splice(cart_product, 1);
                                find_cart.total_price -= find_vat
                                    ? (0, number_checker_1.n)(cart_item.product_total_price) +
                                        ((0, number_checker_1.n)(cart_item.product_total_price) *
                                            (0, number_checker_1.n)(find_vat.vat_percentage)) /
                                            100
                                    : cart_item.product_total_price;
                                find_cart.total_shipping_fee -= cart_item.shipping_fee;
                                find_cart.vat -= find_vat
                                    ? ((0, number_checker_1.n)(cart_item.product_total_price) *
                                        (0, number_checker_1.n)(find_vat.vat_percentage)) /
                                        100
                                    : 0;
                                find_cart.save();
                            }
                            await model_cart_1.CART_ITEM.findOneAndDelete({
                                product: cart_item.product.id,
                            });
                            //c.b) create user review and push the new review on the product so it can be fetched and displayed
                            // get the user profile
                            const user_profile = await model_profile_1.PROFILE.findOne({
                                user: find_one_order_with_ref_id.user.id,
                            });
                            // create review with user profile and product id
                            if (user_profile) {
                                const create_review = await model_review_1.REVIEW.create({
                                    product: cart_item.product.id,
                                    profile: user_profile.id,
                                });
                                // push the review created to the product reviews list
                                const get_prod = await model_product_1.PRODUCT.findById(cart_item.product.id);
                                get_prod?.reviews.push(create_review.id);
                                get_prod?.save();
                            }
                        }
                    }
                    break;
                default:
                    find_one_order_with_ref_id.payment_status = interface_sales_1.PaymentStatusE.PENDING;
            }
            switch (get_the_data.channel) {
                case "bank_transfer":
                    find_one_order_with_ref_id.payment_method =
                        interface_sales_1.PaymentMethodE.BANK_TRANSFERS;
                    break;
                case "card":
                    find_one_order_with_ref_id.payment_method =
                        interface_sales_1.PaymentMethodE.CREDIT_CARD;
            }
            find_one_order_with_ref_id.save();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.verifyOnlineSales = verifyOnlineSales;
const acceptOrder = async (request, response, next) => {
    try {
        const accept_order_process = await model_online_1.ONLINE_ORDER.findById(request.params.id);
        if (accept_order_process) {
            if (request.user.id !== accept_order_process.handled_by.id &&
                accept_order_process.is_being_handled) {
                // const find staff
                const staff = await model_staff_1.STAFF.findOne({
                    user: accept_order_process.handled_by,
                });
                throw (0, custom_error_1.APP_ERROR)(`the order is being handled by ${staff?.first_name} ${staff?.last_name}`);
            }
            accept_order_process.is_being_handled = true;
            accept_order_process.handled_by = request.user.id;
            // send notification to staff about accepted order
            await model_notification_1.NOTIFICATION.create({
                user: request.user.id,
                message_type: interface_online_1.MessageTypeE.TEXT,
                title: `you have accepted to process the order `,
            });
            const message = (0, service_online_1.customMessage)({
                information: `your order is being packaged and awaiting for dispatch`,
                title: "order is being packaged",
                message_type: interface_online_1.MessageTypeE.TEXT,
            });
            accept_order_process.order_status = interface_online_1.OnlineOrderStatusE.ORDER_PACKAGED;
            accept_order_process.message.push(message);
            accept_order_process.save();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.acceptOrder = acceptOrder;
const processOrder = async (request, response, next) => {
    try {
        // const check the user first to see if its the person thats handling the request
        const find_order = await model_online_1.ONLINE_ORDER.findById(request.params.id);
        if (!find_order)
            throw (0, custom_error_1.APP_ERROR)("the order id is not found");
        if (find_order.handled_by !== request.user.id)
            throw (0, custom_error_1.APP_ERROR)("this staff is not authenticated to process this order");
        // send the user a notification,  a message and  staff
        find_order.is_ready_for_dispatch = true;
        find_order.order_status = interface_online_1.OnlineOrderStatusE.ORDER_PACKAGED;
        // create a new dispatch order and send notification to users handling dispatch
        //a) create a dispatch query
        const new_dispatch = await model_dispatch_1.DISPATCH.create({
            tracking_id: (0, id_generator_1.generateId)(id_gen_interface_1.IdGenE.DISPATCH),
            order_id: find_order.order_id,
        });
        find_order.dispatch = new_dispatch.id;
        const dispatchers = await model_auth_1.USER.find({
            permissions: { $elemMatch: general_factory_1.PermissionsE.HANDLE_DISPATCH },
        });
        for (const dispatcher of dispatchers) {
            // check if its staff
            const staff = await model_staff_1.STAFF.findOne({ user: dispatcher.id });
            if (!staff)
                throw (0, custom_error_1.APP_ERROR)("not a staff");
            await model_notification_1.NOTIFICATION.create({
                user: dispatcher.id,
                message_type: interface_online_1.MessageTypeE.TEXT,
                title: `alert new order with ${find_order.order_id} is ready for dispatch`,
            });
        }
        await model_notification_1.NOTIFICATION.create({
            user: request.user.id,
            message_type: interface_online_1.MessageTypeE.TEXT,
            title: `you have created a dispatch order for ${find_order.order_id}`,
        });
        await model_notification_1.NOTIFICATION.create({
            user: find_order.user,
            message_type: interface_online_1.MessageTypeE.TEXT,
            title: `order ${find_order.order_id} is being dispatched`,
        });
        const message = (0, service_online_1.customMessage)({
            information: `your order is being packaged and awaiting for dispatch`,
            title: "order is being packaged",
            message_type: interface_online_1.MessageTypeE.TEXT,
        });
        find_order.message.push(message);
        find_order.sold_by = request.user.id;
        find_order.save();
    }
    catch (error) {
        next(error);
    }
};
exports.processOrder = processOrder;
const getOneOrderByStaff = async (request, response, next) => {
    try {
        const crud_dispatch = new crud_1.Crud(request, response, next);
        crud_dispatch.getOne({
            model: model_online_1.ONLINE_ORDER,
            exempt: "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
        }, { id: request.params.id }, { model: "dispatch", fields: "" });
    }
    catch (error) {
        next(error);
    }
};
exports.getOneOrderByStaff = getOneOrderByStaff;
const getOneOrderByUser = async (request, response, next) => {
    try {
        const crud_dispatch = new crud_1.Crud(request, response, next);
        crud_dispatch.getOne({
            model: model_online_1.ONLINE_ORDER,
            exempt: "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
        }, { id: request.params.id }, {
            model: "dispatch",
            fields: "order_id tracking_id dispatch_company dispatched_at delivery_status dispatcher_has_dispatched user_has_received",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOneOrderByUser = getOneOrderByUser;
const getManyOrderByStaff = async (request, response, next) => {
    try {
        const crud_dispatch = new crud_1.Crud(request, response, next);
        crud_dispatch.getMany({
            model: model_online_1.ONLINE_ORDER,
            exempt: "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
        }, request.query, {}, { model: "dispatch", fields: "" });
    }
    catch (error) {
        next(error);
    }
};
exports.getManyOrderByStaff = getManyOrderByStaff;
const getManyOrderByUser = async (request, response, next) => {
    try {
        const crud_dispatch = new crud_1.Crud(request, response, next);
        crud_dispatch.getMany({
            model: model_online_1.ONLINE_ORDER,
            exempt: "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold -transfer_handling -branch -sold_BY -payment_status -handled_by  -user ",
        }, request.query, { user: request.user.id }, {
            model: "dispatch",
            fields: "order_id tracking_id dispatch_company dispatched_at delivery_status dispatcher_has_dispatched user_has_received",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getManyOrderByUser = getManyOrderByUser;
const transferOrder = async (request, response, next) => {
    try {
        const body = request.body;
        const staff_id = body.staff_id;
        const find_staff = await model_staff_1.STAFF.findById(staff_id);
        if (!find_staff)
            throw (0, custom_error_1.APP_ERROR)("staff not found");
        const get_order = await model_online_1.ONLINE_ORDER.findById(request.params.id);
        if (!get_order)
            throw (0, custom_error_1.APP_ERROR)("the order is not found");
        get_order.transfer_handling.push({
            acceptance_status: interface_online_1.AcceptanceStatusE.PENDING,
            from: request.user.id,
            to: find_staff.user,
            time: new Date(),
        });
        await model_notification_1.NOTIFICATION.create({
            user: find_staff.user,
            message_type: interface_online_1.MessageTypeE.URL,
            title: "transfer order",
            information: `the kindly handle the transfer request of order id ${get_order.order_id}`,
        });
        get_order.save();
    }
    catch (error) {
        next(error);
    }
};
exports.transferOrder = transferOrder;
const handleTransferOrder = async (request, response, next) => {
    try {
        const get_order = await model_online_1.ONLINE_ORDER.findById(request.params.id);
        if (!get_order)
            throw (0, custom_error_1.APP_ERROR)("the order is not found");
        const { status } = request.body;
        if (status === interface_online_1.AcceptanceStatusE.ACCEPTED) {
            const find_transfer = get_order.transfer_handling.find((t) => t.to === request.user.id &&
                t.acceptance_status === interface_online_1.AcceptanceStatusE.PENDING);
            if (!find_transfer)
                throw (0, custom_error_1.APP_ERROR)("no transfer request available");
            find_transfer.acceptance_status = interface_online_1.AcceptanceStatusE.ACCEPTED;
            get_order.handled_by = request.user.id;
        }
        else if (status === interface_online_1.AcceptanceStatusE.REJECTED) {
            const find_transfer = get_order.transfer_handling.find((t) => t.to === request.user.id &&
                t.acceptance_status === interface_online_1.AcceptanceStatusE.PENDING);
            if (!find_transfer)
                throw (0, custom_error_1.APP_ERROR)("no transfer request available");
            find_transfer.acceptance_status = interface_online_1.AcceptanceStatusE.REJECTED;
            get_order.handled_by = request.user.id;
        }
        get_order.save();
    }
    catch (error) {
        next(error);
    }
};
exports.handleTransferOrder = handleTransferOrder;
const updateOrderByStaff = async (request, response, next) => {
    try {
        const body = request.body;
        const crud_dispatch = new crud_1.Crud(request, response, next);
        crud_dispatch.update({
            model: model_online_1.ONLINE_ORDER,
            exempt: "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
        }, { ...body, updated_by: request.user.id }, { _id: request.params.id });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrderByStaff = updateOrderByStaff;
const updateOrderByAdmin = async (request, response, next) => {
    try {
        const body = request.body;
        const crud_dispatch = new crud_1.Crud(request, response, next);
        crud_dispatch.update({
            model: model_online_1.ONLINE_ORDER,
            exempt: "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
        }, { ...body, updated_by: request.user.id }, { _id: request.params.id });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrderByAdmin = updateOrderByAdmin;
const deleteOrderByStaff = async (request, response, next) => {
    try {
        const crud_dispatch = new crud_1.Crud(request, response, next);
        crud_dispatch.delete({
            model: model_online_1.ONLINE_ORDER,
            exempt: "-__v -created_at -updated_at -user -vat -server_total -server_amount_sold  ",
        }, { _id: request.params.id });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOrderByStaff = deleteOrderByStaff;
// get all orders by staff
// get all orders by admin
// get one order by staff
// get all order by user
