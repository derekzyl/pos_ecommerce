"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileIndex = void 0;
const controller_profile_1 = require("./main_profile/controller.profile");
class Profile {
    create_profile = controller_profile_1.createProfile;
    get_all_profile = controller_profile_1.getManyProfile;
    get_one_profile = controller_profile_1.getOneProfile;
    update_profile = controller_profile_1.updateProfile;
    delete_profile = controller_profile_1.deleteProfile;
}
exports.ProfileIndex = new Profile();
