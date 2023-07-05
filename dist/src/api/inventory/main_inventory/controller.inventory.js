"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBranchInventory = exports.updateBranchInventory = exports.getManyBranchInventory = exports.getOneBranchInventory = exports.createBranchInventory = exports.deleteInventory = exports.updateInventory = exports.getManyInventory = exports.getOneInventory = exports.createInventory = void 0;
const model_inventory_1 = require("./model.inventory");
const crud_1 = require("../../general_factory/crud");
const id_generator_1 = require("../../../utilities/id_generator");
const model_product_1 = require("../../product/main_product/model.product");
const custom_error_1 = require("../../../utilities/custom_error");
const http_response_1 = require("../../../utilities/http_response");
const id_gen_interface_1 = require("../../../utilities/interface_utilities/id_gen.interface");
//todo inventory receipt
const createInventory = async (request, response, next) => {
    try {
        const inventory_id = (0, id_generator_1.generateId)(id_gen_interface_1.IdGenE.INVENTORY);
        const inventory_receipt = "todo";
        const body = request.body;
        const products = body.products;
        const inventory_body = {
            inventory_id,
            products,
            inventory_receipt,
        };
        for (const product of products) {
            // add product count
            const get_product = await model_product_1.PRODUCT.findById(product.product.id);
            if (!get_product)
                throw (0, custom_error_1.APP_ERROR)("product not found in database", http_response_1.HTTP_RESPONSE.NOT_FOUND);
            get_product.number_in_stock =
                Number(get_product.number_in_stock) + Number(product.quantity);
            get_product.save();
        }
        const crud_inventory = new crud_1.Crud(request, response, next);
        crud_inventory.create({ model: model_inventory_1.INVENTORY, exempt: "" }, inventory_body, {
            inventory_id: inventory_id,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createInventory = createInventory;
const getOneInventory = async (request, response, next) => {
    const crud_inventory = new crud_1.Crud(request, response, next);
    crud_inventory.getOne({ model: model_inventory_1.INVENTORY, exempt: "-__v " }, { inventory_name: request.params.id }, {});
};
exports.getOneInventory = getOneInventory;
const getManyInventory = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.getMany({ model: model_inventory_1.INVENTORY, exempt: "-__v " }, request.query, {}, {});
};
exports.getManyInventory = getManyInventory;
const updateInventory = async (request, response, next) => {
    const body = request.body;
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.update({ model: model_inventory_1.INVENTORY, exempt: "-__v" }, { inventory_name: request.params.id }, { ...body });
};
exports.updateInventory = updateInventory;
const deleteInventory = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.delete({ model: model_inventory_1.INVENTORY, exempt: "-__v -created_at -updated_at" }, { inventory_name: request.params.id });
};
exports.deleteInventory = deleteInventory;
//todo inventory receipt
const createBranchInventory = async (request, response, next) => {
    try {
        const inventory_id = (0, id_generator_1.generateId)(id_gen_interface_1.IdGenE.INVENTORY);
        const inventory_receipt = "todo";
        const body = request.body;
        const products = body.products;
        const inventory_body = {
            name: body.name,
            branch: body.branch,
            inventory_id,
            products,
            inventory_receipt,
        };
        for (const product of products) {
            // add product count
            const get_product = await model_product_1.PRODUCT.findById(product.product.id);
            if (!get_product)
                throw (0, custom_error_1.APP_ERROR)("product not found in database", http_response_1.HTTP_RESPONSE.NOT_FOUND);
            get_product.number_in_stock =
                Number(get_product.number_in_stock) + Number(product.quantity);
            get_product.save();
        }
        const crud_inventory = new crud_1.Crud(request, response, next);
        crud_inventory.create({ model: model_inventory_1.BRANCH_INVENTORY, exempt: "" }, inventory_body, {
            inventory_id: inventory_id,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBranchInventory = createBranchInventory;
const getOneBranchInventory = async (request, response, next) => {
    const crud_inventory = new crud_1.Crud(request, response, next);
    crud_inventory.getOne({ model: model_inventory_1.BRANCH_INVENTORY, exempt: "-__v " }, { name: request.params.id }, {});
};
exports.getOneBranchInventory = getOneBranchInventory;
const getManyBranchInventory = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.getMany({ model: model_inventory_1.BRANCH_INVENTORY, exempt: "-__v " }, request.query, {}, { model: "products" });
};
exports.getManyBranchInventory = getManyBranchInventory;
const updateBranchInventory = async (request, response, next) => {
    const body = request.body;
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.update({ model: model_inventory_1.BRANCH_INVENTORY, exempt: "-__v" }, { inventory_name: request.params.id }, { ...body });
};
exports.updateBranchInventory = updateBranchInventory;
const deleteBranchInventory = async (request, response, next) => {
    const crud_review = new crud_1.Crud(request, response, next);
    crud_review.delete({ model: model_inventory_1.BRANCH_INVENTORY, exempt: "-__v -created_at -updated_at" }, { inventory_name: request.params.id });
};
exports.deleteBranchInventory = deleteBranchInventory;
