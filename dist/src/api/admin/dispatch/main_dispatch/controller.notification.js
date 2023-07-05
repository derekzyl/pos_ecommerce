"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReadNotification = exports.deleteNotification = exports.updateNotification = exports.getManyNotification = exports.getOneNotification = exports.createNotification = void 0;
const model_notification_1 = require("./model.notification");
const crud_1 = require("../../general_factory/crud");
const createNotification = async (request, response, next) => {
    try {
        const body = request.body;
        const gotten_body = { ...body, user: request.user.id };
        const crud_notification = new crud_1.Crud(request, response, next);
        crud_notification.create({ model: model_notification_1.NOTIFICATION, exempt: "" }, gotten_body, {});
    }
    catch (error) {
        next(error);
    }
};
exports.createNotification = createNotification;
const getOneNotification = async (request, response, next) => {
    const crud_notification = new crud_1.Crud(request, response, next);
    crud_notification.getOne({ model: model_notification_1.NOTIFICATION, exempt: "-__v -created_at updated_at" }, { notification_name: request.params.id }, {});
};
exports.getOneNotification = getOneNotification;
const getManyNotification = async (request, response, next) => {
    const crud_notification = new crud_1.Crud(request, response, next);
    crud_notification.getMany({ model: model_notification_1.NOTIFICATION, exempt: "-__v -created_at -updated_at" }, request.query, { user: request.user.id }, {});
};
exports.getManyNotification = getManyNotification;
const updateNotification = async (request, response, next) => {
    const body = request.body;
    const crud_notification = new crud_1.Crud(request, response, next);
    crud_notification.update({ model: model_notification_1.NOTIFICATION, exempt: "-__v" }, { notification_name: request.params.id }, { ...body });
};
exports.updateNotification = updateNotification;
const deleteNotification = async (request, response, next) => {
    const crud_notification = new crud_1.Crud(request, response, next);
    crud_notification.delete({ model: model_notification_1.NOTIFICATION, exempt: "-__v -created_at -updated_at" }, { notification_name: request.params.id });
};
exports.deleteNotification = deleteNotification;
const updateReadNotification = async (request, response, next) => {
    const crud_notification = new crud_1.Crud(request, response, next);
    crud_notification.update({ model: model_notification_1.NOTIFICATION, exempt: "-__v" }, { notification_name: request.params.id }, { read_receipt: true });
};
exports.updateReadNotification = updateReadNotification;
