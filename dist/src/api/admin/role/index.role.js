"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleIndex = void 0;
const controller_role_1 = require("./main_role/controller.role");
class Role {
    createRole = controller_role_1.createRole;
    getAllRole = controller_role_1.getAllRole;
    updateRole = controller_role_1.updateOneRole;
    deleteRole = controller_role_1.deleteOneRole;
}
exports.RoleIndex = new Role();
