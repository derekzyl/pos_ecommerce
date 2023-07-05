"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffIndex = void 0;
const controller_staff_1 = require("./main_staff/controller.staff");
class Staff {
    create_staff = controller_staff_1.createStaff;
    update_staff = controller_staff_1.adminUpdateStaff;
    staff_update_self = controller_staff_1.staffUpdateSelf;
    get_staff_profile = controller_staff_1.getMyStaffProfile;
    get_one_staff = controller_staff_1.getOneStaff;
    get_all_staff = controller_staff_1.getAllStaff;
    delete_staff = controller_staff_1.deleteStaff;
}
exports.StaffIndex = new Staff();
