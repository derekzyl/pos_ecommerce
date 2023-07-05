"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlist = exports.removeWishlist = exports.addWishlist = void 0;
const model_wishlist_1 = require("./model.wishlist");
const model_product_1 = require("../../../product/main_product/model.product");
const custom_error_1 = require("../../../../utilities/custom_error");
const http_response_1 = require("../../../../utilities/http_response");
const response_message_1 = require("../../../../utilities/response_message");
const crud_1 = require("../../../general_factory/crud");
//todo address receipt
const addWishlist = async (request, response, next) => {
    try {
        const id = request.params.id;
        const get_product = await model_product_1.PRODUCT.findById(id);
        if (!get_product) {
            throw (0, custom_error_1.APP_ERROR)("product not found sorry", http_response_1.HTTP_RESPONSE.NOT_FOUND);
        }
        const user = request.user;
        let get_wish_list = await model_wishlist_1.WISHLIST.findOne({ user: user.id }).populate("products");
        if (!get_wish_list)
            get_wish_list = await model_wishlist_1.WISHLIST.create({ user: user });
        const g = get_wish_list.products.findIndex((prod) => prod.id === get_product.id);
        let added = true;
        if (g > -1) {
            added = false;
            get_wish_list?.products.splice(g, 1);
        }
        else {
            get_wish_list.products = get_wish_list.products.concat(get_product.id);
        }
        get_wish_list.save();
        return response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            data: `${get_product.name} ${added ? "added" : "removed"} successfully  ${added ? "to" : "from"} wish list`,
            message: `${added ? "added" : "removed"} successfully`,
            success_status: true,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.addWishlist = addWishlist;
const removeWishlist = async (request, response, next) => {
    try {
        const id = request.params.id;
        const get_product = await model_product_1.PRODUCT.findById(id);
        if (!get_product) {
            throw (0, custom_error_1.APP_ERROR)("product not found sorry", http_response_1.HTTP_RESPONSE.NOT_FOUND);
        }
        const user = request.user;
        const get_wish_list = await model_wishlist_1.WISHLIST.findOne({ user: user.id }).populate("products");
        if (!get_wish_list)
            throw (0, custom_error_1.APP_ERROR)("oops some error glitch here", http_response_1.HTTP_RESPONSE.FORBIDDEN);
        get_wish_list.products = get_wish_list?.products.filter((product) => product.id !== get_product.id);
        get_wish_list.save();
        return response.status(http_response_1.HTTP_RESPONSE.OK).json((0, response_message_1.responseMessage)({
            data: `${get_product.name} removed successfully from wish list`,
            message: "removed successfully",
            success_status: true,
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.removeWishlist = removeWishlist;
const getWishlist = async (request, response, next) => {
    try {
        const get_crud = new crud_1.Crud(request, response, next);
        await get_crud.getMany({ model: model_wishlist_1.WISHLIST, exempt: "-user" }, request.query, { user: request.user.id }, { model: "products" });
    }
    catch (error) {
        next(error);
    }
};
exports.getWishlist = getWishlist;
