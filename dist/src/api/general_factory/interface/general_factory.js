"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.time_stamps = exports.PermissionsE = void 0;
/**
 * THE AVAILABLE PERMISSIONS
 *
 * --------------------------------------
 *  trust me the list is kinda endless ill advice you come see for youself
 */
var PermissionsE;
(function (PermissionsE) {
    //CRUD PRODUCT
    PermissionsE["CREATE_PRODUCT"] = "CREATE_PRODUCT";
    PermissionsE["VIEW_PRODUCT"] = "VIEW_PRODUCT";
    PermissionsE["EDIT_PRODUCT"] = "EDIT_PRODUCT";
    PermissionsE["DELETE_PRODUCT"] = "DELETE_PRODUCT";
    // CRUD STAFF
    PermissionsE["CREATE_STAFF"] = "CREATE_STAFF";
    PermissionsE["VIEW_STAFF"] = "VIEW_STAFF";
    PermissionsE["EDIT_STAFF"] = "EDIT_STAFF";
    PermissionsE["DELETE_STAFF"] = "DELETE_STAFF";
    //CREATE ROLE
    PermissionsE["CREATE_ROLE"] = "CREATE_ROLE";
    PermissionsE["VIEW_ROLE"] = "VIEW_ROLE";
    PermissionsE["EDIT_ROLE"] = "EDIT_ROLE";
    PermissionsE["DELETE_ROLE"] = "DELETE_ROLE";
    //DISPATCH ROLE
    PermissionsE["CREATE_BRANCH"] = "CREATE_BRANCH";
    PermissionsE["VIEW_BRANCH"] = "VIEW_BRANCH";
    PermissionsE["EDIT_BRANCH"] = "EDIT_BRANCH";
    PermissionsE["DELETE_BRANCH"] = "DELETE_BRANCH";
    // category and sub category
    PermissionsE["CREATE_CATEGORY"] = "CREATE_CATEGORY";
    PermissionsE["VIEW_CATEGORY"] = "VIEW_CATEGORY";
    PermissionsE["EDIT_CATEGORY"] = "EDIT_CATEGORY";
    PermissionsE["DELETE_CATEGORY"] = "DELETE_CATEGORY";
    //SHIPPING FEE MANAGER
    //review
    PermissionsE["CREATE_REVIEW"] = "CREATE_REVIEW";
    PermissionsE["VIEW_REVIEW"] = "VIEW_REVIEW";
    PermissionsE["EDIT_REVIEW"] = "EDIT_REVIEW";
    PermissionsE["DELETE_REVIEW"] = "DELETE_REVIEW";
    //VAT
    PermissionsE["CREATE_VAT"] = "CREATE_VAT";
    PermissionsE["VIEW_VAT"] = "VIEW_VAT";
    PermissionsE["EDIT_VAT"] = "EDIT_VAT";
    PermissionsE["DELETE_VAT"] = "DELETE_VAT";
    //pos Sales
    PermissionsE["CREATE_POS"] = "CREATE_POS";
    PermissionsE["VIEW_POS"] = "VIEW_POS";
    PermissionsE["EDIT_POS"] = "EDIT_POS";
    PermissionsE["DELETE_POS"] = "DELETE_POS";
    // user profile information
    PermissionsE["CREATE_USER_PROFILE"] = "CREATE_USER_PROFILE";
    PermissionsE["VIEW_USER_PROFILE"] = "VIEW_USER_PROFILE";
    PermissionsE["EDIT_USER_PROFILE"] = "EDIT_USER_PROFILE";
    PermissionsE["DELETE_USER_PROFILE"] = "DELETE_USER_PROFILE";
    // Create shipping fee
    PermissionsE["CREATE_SHIPPING_FEE"] = "CREATE_SHIPPING_FEE";
    PermissionsE["VIEW_SHIPPING_FEE"] = "VIEW_SHIPPING_FEE";
    PermissionsE["EDIT_SHIPPING_FEE"] = "EDIT_SHIPPING_FEE";
    PermissionsE["DELETE_SHIPPING_FEE"] = "DELETE_SHIPPING_FEE";
    // dispatch handler
    PermissionsE["CREATE_DISPATCH"] = "CREATE_DISPATCH";
    PermissionsE["VIEW_DISPATCH"] = "VIEW_DISPATCH";
    PermissionsE["EDIT_DISPATCH"] = "EDIT_DISPATCH";
    PermissionsE["DELETE_DISPATCH"] = "DELETE_DISPATCH";
    PermissionsE["HANDLE_DISPATCH"] = "HANDLE_DISPATCH";
    // manage online order
    PermissionsE["CREATE_ONLINE_ORDER"] = "CREATE_ONLINE_ORDER";
    PermissionsE["VIEW_ONLINE_ORDER"] = "VIEW_ONLINE_ORDER";
    PermissionsE["EDIT_ONLINE_ORDER"] = "EDIT_ONLINE_ORDER";
    PermissionsE["DELETE_ONLINE_ORDER"] = "DELETE_ONLINE_ORDER";
    PermissionsE["HANDLE_ONLINE_ORDER"] = "HANDLE_ONLINE_ORDER";
    PermissionsE["SUPER_ADMIN"] = "SUPER_ADMIN";
})(PermissionsE = exports.PermissionsE || (exports.PermissionsE = {}));
exports.time_stamps = {
    createdAt: "created_at",
    updatedAt: "updated_at",
};
