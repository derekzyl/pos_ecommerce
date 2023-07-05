"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralIndex = void 0;
const controller_factory_1 = require("./controller.factory");
const permission_handler_1 = require("./permission_handler");
class GeneralFactory {
    createOneFactory = controller_factory_1.createOne;
    deleteOneFactory = controller_factory_1.deleteOne;
    updateOneFactory = controller_factory_1.updateOne;
    getOneFactory = controller_factory_1.getOne;
    getAllFactory = controller_factory_1.getAll;
    getUserPermissions = permission_handler_1.getPermissions;
}
exports.GeneralIndex = new GeneralFactory();
