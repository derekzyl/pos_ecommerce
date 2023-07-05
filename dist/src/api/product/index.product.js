"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductIndex = void 0;
const controller_product_1 = require("./main_product/controller.product");
class Product {
    create_product = controller_product_1.createProduct;
    get_one_product = controller_product_1.getOneProduct;
    get_all_product = controller_product_1.getManyProduct;
    update_product = controller_product_1.updateProduct;
    delete_product = controller_product_1.deleteProduct;
}
exports.ProductIndex = new Product();
