"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCheckOut = void 0;
const interface_online_1 = require("../interface_online/interface.online");
const model_address_1 = require("../../../user/address/main_address/model.address");
const custom_error_1 = require("../../../../utilities/custom_error");
const http_response_1 = require("../../../../utilities/http_response");
const model_cart_1 = require("../../../user/cart/main_cart/model.cart");
const service_online_1 = require("./service.online");
const number_checker_1 = require("../../../../utilities/number_checker");
const model_product_1 = require("../../../product/main_product/model.product");
const id_generator_1 = require("../../../../utilities/id_generator");
const id_gen_interface_1 = require("../../../../utilities/interface_utilities/id_gen.interface");
const model_vat_1 = require("../../../admin/vat/main_vat/model.vat");
const interface_vat_1 = require("../../../admin/vat/interface_vat/interface.vat");
const model_online_1 = require("./model.online");
const index_payment_1 = require("../../../../utilities/payment/index.payment");
// 1) create a post online order ✅done
// 2) the dispatch rider should be able to maintain the messages on the order dispatch update
// 3) update general update status with update clearance
// 4) get all orders by staff
// 5) get all orders by user
// 6) get one order by staff or user
// 7) customer should be able to review product after purchase ✅done
// meaning we can create a new review of the product and review it ✅done
async function handleCheckOut(body, user) {
    try {
        // 1.1) get the request body
        // 1.2 find if the user has any address at all
        const find_address = await model_address_1.ADDRESS.find({ user: user.id });
        if (!find_address)
            throw (0, custom_error_1.APP_ERROR)("No address found", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        // 1.3  get the user default address
        // find if the user has a default address
        let user_address = await model_address_1.ADDRESS.findOne({
            user: user.id,
            is_default: true,
        });
        if (body.address)
            user_address = await model_address_1.ADDRESS.findById(body.address);
        const shipping_fee = (0, service_online_1.calculateAddressFee)(user_address.id);
        if (!user_address)
            throw (0, custom_error_1.APP_ERROR)("you have no default address", http_response_1.HTTP_RESPONSE.BAD_REQUEST);
        const get_vat = await model_vat_1.VAT.findOne({ vat_name: interface_vat_1.VatE.ONLINE });
        // 1.4 get the cart id
        let total_shipping_fee = 0;
        // amount after discount is applied
        let total_amount = 0;
        //amount before discount
        let original_amount = 0;
        //vat shipping fee_total price
        let amount_sold = 0;
        // discount
        let discount = 0;
        // product and count
        const products = [];
        // first message
        const message = [
            {
                read_receipt: false,
                created_at: new Date(),
                information: "your order has been created and payment is being confirmed",
                updated_at: new Date(),
                title: "payment initialized",
                message_type: interface_online_1.MessageTypeE.TEXT,
            },
        ];
        for (const cart_item of body.cart_items) {
            const get_cart_item_in_db = await model_cart_1.CART_ITEM.findById(cart_item);
            if (!get_cart_item_in_db)
                throw (0, custom_error_1.APP_ERROR)("cart_item not found");
            const get_product = await model_product_1.PRODUCT.findById(get_cart_item_in_db.product.id);
            if (!get_product)
                throw (0, custom_error_1.APP_ERROR)("cart_item not found");
            // a) calculate total product price
            const product_shipping_fee = (await shipping_fee) * (0, number_checker_1.n)(get_cart_item_in_db.product_total_count);
            const total_product_price = (0, number_checker_1.n)(get_product.price) * (0, number_checker_1.n)(get_cart_item_in_db.product_total_count);
            const total_product_price_and_discount = total_product_price +
                (total_product_price * (0, number_checker_1.n)(get_product.discount_percentage)) / 100;
            const get_total_discount = (total_product_price * (0, number_checker_1.n)(get_product.discount_percentage)) / 100;
            // updating the product data
            const product = {
                product: get_product.id,
                product_total_count: get_cart_item_in_db.product_total_count,
                product_total_price: total_product_price_and_discount,
                shipping_fee: product_shipping_fee,
            };
            products.push(product);
            // concatenating the total cumulative data
            original_amount += total_product_price;
            total_amount += total_product_price_and_discount;
            discount += get_total_discount;
            total_shipping_fee += product_shipping_fee;
            //lets start calculations
        }
        const vat = get_vat?.vat_percentage
            ? (total_amount * (0, number_checker_1.n)(get_vat?.vat_percentage)) / 100
            : 0;
        // 1.5 get data from cart and update the  online checkout
        // what to omit a payment_method, payment_status, sales_type,
        amount_sold = vat + total_shipping_fee + total_amount;
        const online_checkout = {
            order_id: (0, id_generator_1.generateId)(id_gen_interface_1.IdGenE.WEB_SALES),
            user: user.id,
            address: user_address.id,
            message,
            products,
            vat,
            amount_sold,
            server_amount_sold: amount_sold,
            server_total: total_amount,
            discount,
            total_amount,
            original_amount,
        };
        const create_online_order = new model_online_1.ONLINE_ORDER(online_checkout);
        const created_order = await create_online_order.save();
        const paystack_data = {
            email: user.email,
            amount: created_order.amount_sold * 100,
            reference: created_order.order_id,
            metadata: created_order.products.toString(),
        };
        // lets  now move to paystack payment
        const paystack = index_payment_1.PaymentIndex.paystack;
        const pay = new paystack();
        const init_pay = await pay.initialize(paystack_data);
        return init_pay.data.authorization_url;
    }
    catch (error) {
        throw (0, custom_error_1.APP_ERROR)(error);
    }
}
exports.handleCheckOut = handleCheckOut;
