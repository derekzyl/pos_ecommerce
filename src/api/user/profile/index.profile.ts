import {
  createProfile,
  deleteProfile,
  getManyProfile,
  getOneProfile,
  updateProfile,
} from "./main_profile/controller.profile";

class Profile {
  public create_profile = createProfile;
  public get_all_profile = getManyProfile;
  public get_one_profile = getOneProfile;
  public update_profile = updateProfile;
  public delete_profile = deleteProfile;
}
export const ProfileIndex = new Profile();
