"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDispatch = exports.updateDispatchByDispatcher = exports.updateDispatchByUser = exports.getManyDispatchByUser = exports.getManyDispatchByStaff = exports.getOneDispatchByStaff = exports.getOneDispatchByUser = exports.createDispatch = void 0;
const model_dispatch_1 = require("./model.dispatch");
const interface_dispatch_1 = require("../interface_dispatch/interface.dispatch");
const crud_1 = require("../../../general_factory/crud");
const createDispatch = async (request, response, next) => {
    try {
        const body = request.body;
        const gotten_body = { ...body, dispatched_by: request.user.id };
        const crud_dispatch = new crud_1.Crud(request, response, next);
        crud_dispatch.create({ model: model_dispatch_1.DISPATCH, exempt: "" }, gotten_body, {});
    }
    catch (error) {
        next(error);
    }
};
exports.createDispatch = createDispatch;
const getOneDispatchByUser = async (request, response, next) => {
    const crud_dispatch = new crud_1.Crud(request, response, next);
    crud_dispatch.getOne({ model: model_dispatch_1.DISPATCH, exempt: "-__v -created_at updated_at" }, { tracking_id: request.params.id, dispatched_to: request.user.id }, {});
};
exports.getOneDispatchByUser = getOneDispatchByUser;
const getOneDispatchByStaff = async (request, response, next) => {
    const crud_dispatch = new crud_1.Crud(request, response, next);
    crud_dispatch.getOne({ model: model_dispatch_1.DISPATCH, exempt: "-__v -created_at updated_at" }, { tracking_id: request.params.id }, {});
};
exports.getOneDispatchByStaff = getOneDispatchByStaff;
const getManyDispatchByStaff = async (request, response, next) => {
    const crud_dispatch = new crud_1.Crud(request, response, next);
    crud_dispatch.getMany({ model: model_dispatch_1.DISPATCH, exempt: "-__v -created_at updated_at" }, request.query, {}, {});
};
exports.getManyDispatchByStaff = getManyDispatchByStaff;
const getManyDispatchByUser = async (request, response, next) => {
    const crud_dispatch = new crud_1.Crud(request, response, next);
    crud_dispatch.getMany({ model: model_dispatch_1.DISPATCH, exempt: "-__v -created_at -updated_at" }, request.query, { dispatched_to: request.user.id }, {});
};
exports.getManyDispatchByUser = getManyDispatchByUser;
const updateDispatchByUser = async (request, response, next) => {
    const body = request.body;
    const crud_dispatch = new crud_1.Crud(request, response, next);
    const data = {
        received_at: body.user_has_received ? new Date() : undefined,
        user_has_received: body.user_has_received ? true : false,
        delivery_status: body.user_has_received
            ? interface_dispatch_1.DeliveryStatusE.RECEIVED_BY_CUSTOMER
            : interface_dispatch_1.DeliveryStatusE.PENDING,
    };
    crud_dispatch.update({ model: model_dispatch_1.DISPATCH, exempt: "-__v" }, { ...data }, { tracking_id: request.params.id });
};
exports.updateDispatchByUser = updateDispatchByUser;
const updateDispatchByDispatcher = async (request, response, next) => {
    const body = request.body;
    const data = {
        ...body,
        delivery_status: body.dispatcher_has_dispatched
            ? interface_dispatch_1.DeliveryStatusE.DELIVERED_BY_DISPATCHER
            : interface_dispatch_1.DeliveryStatusE.ON_TRANSIT,
    };
    const crud_dispatch = new crud_1.Crud(request, response, next);
    crud_dispatch.update({ model: model_dispatch_1.DISPATCH, exempt: "-__v" }, { ...data }, { tracking_id: request.params.id });
};
exports.updateDispatchByDispatcher = updateDispatchByDispatcher;
const deleteDispatch = async (request, response, next) => {
    const crud_dispatch = new crud_1.Crud(request, response, next);
    crud_dispatch.delete({ model: model_dispatch_1.DISPATCH, exempt: "-__v -created_at -updated_at" }, { dispatch_name: request.params.id });
};
exports.deleteDispatch = deleteDispatch;
