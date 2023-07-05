"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getManyProduct = exports.getOneProduct = exports.createProduct = void 0;
const crud_1 = require("../../general_factory/crud");
const model_product_1 = require("./model.product");
const createProduct = async (request, response, next) => {
    //todo: send the images to aws or cloudinary
    try {
        const body = request.body;
        // body.search_tags = Array.from(body.search_tags);
        const b = body.search_tag.split(" ");
        // console.log(body.search_tags, "take by one");
        const gotten_body = {
            ...body,
            search_tags: b,
            created_by: request.user.id,
        };
        const crud_product = new crud_1.Crud(request, response, next);
        crud_product.create({ model: model_product_1.PRODUCT, exempt: "" }, gotten_body, {
            name: gotten_body.name,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const getOneProduct = async (request, response, next) => {
    const crud_product = new crud_1.Crud(request, response, next);
    crud_product.getOne({ model: model_product_1.PRODUCT, exempt: "-__v" }, { id: request.params.id }, {});
};
exports.getOneProduct = getOneProduct;
const getManyProduct = async (request, response, next) => {
    console.log("inside get many products");
    const crud_product = new crud_1.Crud(request, response, next);
    crud_product.getMany({ model: model_product_1.PRODUCT, exempt: "-__v -created_at -updated_at -created_by" }, request.query, {}, [
        { model: "category" },
        {
            model: "sub_category",
            fields: "name image",
        },
        { model: "reviews" },
    ]);
};
exports.getManyProduct = getManyProduct;
const updateProduct = async (request, response, next) => {
    const body = request.body;
    const crud_product = new crud_1.Crud(request, response, next);
    crud_product.update({ model: model_product_1.PRODUCT, exempt: "-__v" }, { ...body }, { id: request.params.id });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (request, response, next) => {
    const crud_product = new crud_1.Crud(request, response, next);
    crud_product.delete({ model: model_product_1.PRODUCT, exempt: "-__v" }, { id: request.params.id });
};
exports.deleteProduct = deleteProduct;
