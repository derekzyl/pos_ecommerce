"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchIndex = void 0;
const controller_dispatch_1 = require("./main_dispatch/controller.dispatch");
class Dispatch {
    create_dispatch = controller_dispatch_1.createDispatch;
    get_one_dispatch_by_staff = controller_dispatch_1.getOneDispatchByStaff;
    get_one_dispatch_by_user = controller_dispatch_1.getOneDispatchByUser;
    get_all_dispatch_by_staff = controller_dispatch_1.getManyDispatchByStaff;
    get_all_dispatch_by_user = controller_dispatch_1.getManyDispatchByUser;
    update_dispatch_by_dispatcher = controller_dispatch_1.updateDispatchByDispatcher;
    update_dispatch_by_user = controller_dispatch_1.updateDispatchByUser;
    delete_dispatch = controller_dispatch_1.deleteDispatch;
}
exports.DispatchIndex = new Dispatch();
