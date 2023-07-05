import {
  createStaff,
  deleteStaff,
  getAllStaff,
  getMyStaffProfile,
  getOneStaff,
  adminUpdateStaff,
  staffUpdateSelf,
} from "./main_staff/controller.staff";

class Staff {
  public create_staff = createStaff;
  public update_staff = adminUpdateStaff;
  public staff_update_self = staffUpdateSelf;

  public get_staff_profile = getMyStaffProfile;
  public get_one_staff = getOneStaff;
  public get_all_staff = getAllStaff;
  public delete_staff = deleteStaff;
}
export const StaffIndex = new Staff();
