"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVat = exports.updateVat = exports.getManyVat = exports.getOneVat = exports.createVat = void 0;
const crud_1 = require("../../../general_factory/crud");
const model_vat_1 = require("./model.vat");
const createVat = async (request, response, next) => {
    try {
        const body = request.body;
        const gotten_body = { ...body };
        const crud_vat = new crud_1.Crud(request, response, next);
        crud_vat.create({ model: model_vat_1.VAT, exempt: "" }, gotten_body, {
            vat_name: body.vat_name,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createVat = createVat;
const getOneVat = async (request, response, next) => {
    const crud_vat = new crud_1.Crud(request, response, next);
    crud_vat.getOne({ model: model_vat_1.VAT, exempt: "-__v -created_at updated_at" }, { vat_name: request.params.id }, {});
};
exports.getOneVat = getOneVat;
const getManyVat = async (request, response, next) => {
    const crud_vat = new crud_1.Crud(request, response, next);
    crud_vat.getMany({ model: model_vat_1.VAT, exempt: "-__v -created_at -updated_at" }, request.query, {}, {});
};
exports.getManyVat = getManyVat;
const updateVat = async (request, response, next) => {
    const body = request.body;
    const crud_vat = new crud_1.Crud(request, response, next);
    crud_vat.update({ model: model_vat_1.VAT, exempt: "-__v" }, { vat_name: request.params.id }, { ...body });
};
exports.updateVat = updateVat;
const deleteVat = async (request, response, next) => {
    const crud_vat = new crud_1.Crud(request, response, next);
    crud_vat.delete({ model: model_vat_1.VAT, exempt: "-__v -created_at -updated_at" }, { vat_name: request.params.id });
};
exports.deleteVat = deleteVat;
