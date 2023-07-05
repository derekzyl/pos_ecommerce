"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePos = exports.updatePos = exports.getManyPosProduct = exports.getManyPos = exports.getOnePos = exports.createPos = void 0;
const crud_1 = require("../../../general_factory/crud");
const model_pos_1 = require("./model.pos");
const model_branch_1 = require("../../../admin/branch/main_branch/model.branch");
const model_staff_1 = require("../../../admin/staff/main_staff/model.staff");
const id_generator_1 = require("../../../../utilities/id_generator");
const interface_sales_1 = require("../../interface_sales/interface.sales");
const model_vat_1 = require("../../../admin/vat/main_vat/model.vat");
const interface_vat_1 = require("../../../admin/vat/interface_vat/interface.vat");
const model_product_1 = require("../../../product/main_product/model.product");
const custom_error_1 = require("../../../../utilities/custom_error");
const http_response_1 = require("../../../../utilities/http_response");
const response_message_1 = require("../../../../utilities/response_message");
const id_gen_interface_1 = require("../../../../utilities/interface_utilities/id_gen.interface");
// todo: get products for pos
//! remove original amount
const createPos = async (request, response, next) => {
    try {
        const order_id = (0, id_generator_1.generateId)(id_gen_interface_1.IdGenE.POS_SALES);
        const body = request.body;
        let order_status = interface_sales_1.OrderStatusE.PENDING;
        const get_staff = await model_staff_1.STAFF.findOne({ user: request.user.id });
        const get_branch = await model_branch_1.BRANCH.findOne({
            id: get_staff?.branch.id,
        });
        const payment_method = body.payment_method;
        let payment_status = interface_sales_1.PaymentStatusE.PROCESSING;
        /**
         * server total is the total for the products ordered when the discount has been removed
         */
        let server_total = 0;
        const get_vat = await model_vat_1.VAT.findOne({ vat_name: interface_vat_1.VatE.LOCAL });
        const sales_type = interface_sales_1.SalesTypeE.STORE_SALES;
        const products = body.products;
        const total_amount = Number(body.total_amount);
        const original_amount = Number(body.original_amount);
        const order_type = body.order_type;
        const all_products = [];
        const discount = Number(body.discount);
        const amount_sold = Number(body.amount_sold);
        for (const product of products) {
            await getProductsData(product);
        }
        // eslint-disable-next-line no-inner-declarations
        async function getProductsData(product) {
            const get_product = await model_product_1.PRODUCT.findById(product.product.id);
            if (!get_product)
                throw (0, custom_error_1.APP_ERROR)("product not found in database");
            const product_price = Number(get_product?.price);
            const get_discount_of_product = (get_product?.discount_percentage * product_price) / 100;
            const product_quantity = Number(product.quantity_of_product);
            if (product_quantity < 1) {
                payment_status = interface_sales_1.PaymentStatusE.PROCESSING;
                throw (0, custom_error_1.APP_ERROR)(`less than 1 of ${get_product?.name} is selected `);
            }
            const get_total = product_price * product_quantity - (get_discount_of_product ?? 0);
            if (Number(product.total !== get_total)) {
                payment_status = interface_sales_1.PaymentStatusE.DISPUTE;
                throw (0, custom_error_1.APP_ERROR)(`${get_product.name} total doesn't tally with the expected total`);
            }
            server_total += get_total;
            const one_product = {
                product: get_product.id,
                quantity_of_product: product_quantity,
                total: get_total,
            };
            all_products.push(one_product);
            // lets work on the  product count in the database
            // updated the total stock from product count
            get_product.number_in_stock = get_product.number_in_stock - 1;
            get_product.save();
            // updated the total stock from branch product count
            get_branch?.products
                .filter((prd) => prd.product.id === get_product.id)
                .forEach((prd) => (prd.amount_in_stock = prd.amount_in_stock - 1));
            get_branch?.save();
        }
        // getting the vat ( value added tax)
        let vat = 0;
        if (get_vat) {
            vat = Number(get_vat.vat_percentage);
        }
        const vat_server_total = (server_total * vat) / 100;
        // total amount and server total are same we are just trying to make sure we check the sales our selves
        // Note: this is the product price sum checking for product discount too
        const discount_server_total = (server_total * discount) / 100;
        // server amount sold is server total  + (plus) vat and a general discount if there is any discount from sales
        const server_amount_sold = server_total + vat_server_total - discount_server_total;
        order_status = interface_sales_1.OrderStatusE.SUCCESS;
        payment_status = interface_sales_1.PaymentStatusE.APPROVED;
        const pos_body = {
            order_id,
            products: all_products,
            order_type,
            order_status,
            payment_method,
            payment_status,
            sold_by: get_staff?.id,
            branch: get_branch?.id,
            vat,
            server_total,
            original_amount,
            sales_type,
            total_amount,
            discount,
            amount_sold,
            server_amount_sold,
        };
        const crud_pos = new crud_1.Crud(request, response, next);
        crud_pos.create({ model: model_pos_1.POS, exempt: "" }, pos_body, {
            order_id,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createPos = createPos;
const getOnePos = async (request, response, next) => {
    const crud_pos = new crud_1.Crud(request, response, next);
    crud_pos.getOne({ model: model_pos_1.POS, exempt: "-__v -created_at updated_at" }, { id: request.params.id }, {});
};
exports.getOnePos = getOnePos;
const getManyPos = async (request, response, next) => {
    const crud_pos = new crud_1.Crud(request, response, next);
    crud_pos.getMany({ model: model_pos_1.POS, exempt: "-__v -created_at -updated_at" }, request.query, {}, {});
};
exports.getManyPos = getManyPos;
const getManyPosProduct = async (request, response) => {
    try {
        const get_staff = await model_staff_1.STAFF.findOne({ user: request.user.id });
        const get_branch = await model_branch_1.BRANCH.findOne({
            id: get_staff?.branch.id,
        }).populate({ path: "product", match: { name: request.query.name } });
        let get_branch_product = get_branch?.products;
        if (get_branch_product) {
            get_branch_product = get_branch_product.filter((product) => product.amount_in_stock > 0);
        }
        return response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            data: get_branch_product,
            message: "data fetched successfully",
            success_status: true,
            doc_length: get_branch_product?.length,
        }));
    }
    catch (error) {
        return response.status(http_response_1.HTTP_RESPONSE.BAD_REQUEST).json((0, response_message_1.responseMessage)({
            data: error,
            message: "data fetched not fetched",
            success_status: false,
        }));
    }
};
exports.getManyPosProduct = getManyPosProduct;
const updatePos = async (request, response, next) => {
    const body = request.body;
    const crud_pos = new crud_1.Crud(request, response, next);
    crud_pos.update({ model: model_pos_1.POS, exempt: "-__v" }, { ...body }, { id: request.params.id });
};
exports.updatePos = updatePos;
const deletePos = async (request, response, next) => {
    const crud_pos = new crud_1.Crud(request, response, next);
    crud_pos.delete({ model: model_pos_1.POS, exempt: "-__v -created_at -updated_at" }, { id: request.params.id });
};
exports.deletePos = deletePos;
