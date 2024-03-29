import { Model, PopulateOptions } from "mongoose";

/**
 * THE AVAILABLE PERMISSIONS
 *
 * --------------------------------------
 *  trust me the list is kinda endless ill advice you come see for youself
 */
export enum PermissionsE {
  //CRUD PRODUCT
  CREATE_PRODUCT = "CREATE_PRODUCT",
  VIEW_PRODUCT = "VIEW_PRODUCT",
  EDIT_PRODUCT = "EDIT_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  // CRUD STAFF
  CREATE_STAFF = "CREATE_STAFF",
  VIEW_STAFF = "VIEW_STAFF",
  EDIT_STAFF = "EDIT_STAFF",
  DELETE_STAFF = "DELETE_STAFF",
  //CREATE ROLE
  CREATE_ROLE = "CREATE_ROLE",
  VIEW_ROLE = "VIEW_ROLE",
  EDIT_ROLE = "EDIT_ROLE",
  DELETE_ROLE = "DELETE_ROLE",
  //DISPATCH ROLE
  CREATE_BRANCH = "CREATE_BRANCH",
  VIEW_BRANCH = "VIEW_BRANCH",
  EDIT_BRANCH = "EDIT_BRANCH",
  DELETE_BRANCH = "DELETE_BRANCH",
  // category and sub category
  CREATE_CATEGORY = "CREATE_CATEGORY",
  VIEW_CATEGORY = "VIEW_CATEGORY",
  EDIT_CATEGORY = "EDIT_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  //SHIPPING FEE MANAGER

  //review
  CREATE_REVIEW = "CREATE_REVIEW",
  VIEW_REVIEW = "VIEW_REVIEW",
  EDIT_REVIEW = "EDIT_REVIEW",
  DELETE_REVIEW = "DELETE_REVIEW",

  //VAT
  CREATE_VAT = "CREATE_VAT",
  VIEW_VAT = "VIEW_VAT",
  EDIT_VAT = "EDIT_VAT",
  DELETE_VAT = "DELETE_VAT",

  //pos Sales

  CREATE_POS = "CREATE_POS",
  VIEW_POS = "VIEW_POS",
  EDIT_POS = "EDIT_POS",
  DELETE_POS = "DELETE_POS",

  // user profile information

  CREATE_USER_PROFILE = "CREATE_USER_PROFILE",
  VIEW_USER_PROFILE = "VIEW_USER_PROFILE",
  EDIT_USER_PROFILE = "EDIT_USER_PROFILE",
  DELETE_USER_PROFILE = "DELETE_USER_PROFILE",

  // Create shipping fee

  CREATE_SHIPPING_FEE = "CREATE_SHIPPING_FEE",
  VIEW_SHIPPING_FEE = "VIEW_SHIPPING_FEE",
  EDIT_SHIPPING_FEE = "EDIT_SHIPPING_FEE",
  DELETE_SHIPPING_FEE = "DELETE_SHIPPING_FEE",

  // dispatch handler
  CREATE_DISPATCH = "CREATE_DISPATCH",
  VIEW_DISPATCH = "VIEW_DISPATCH",
  EDIT_DISPATCH = "EDIT_DISPATCH",
  DELETE_DISPATCH = "DELETE_DISPATCH",
  HANDLE_DISPATCH = "HANDLE_DISPATCH",

  // manage online order
  CREATE_CAMPAIGN = "CREATE_CAMPAIGN",
  VIEW_CAMPAIGN = "VIEW_CAMPAIGN",
  EDIT_CAMPAIGN = "EDIT_CAMPAIGN",
  DELETE_CAMPAIGN = "DELETE_CAMPAIGN",
  HANDLE_CAMPAIGN = "HANDLE_CAMPAIGN",

  // frontend
  CREATE_SLIDER = "CREATE_SLIDER",
  VIEW_SLIDER = "VIEW_SLIDER",
  EDIT_SLIDER = "EDIT_SLIDER",
  DELETE_SLIDER = "DELETE_SLIDER",
  HANDLE_SLIDER = "HANDLE_SLIDER",

  // slider
  CREATE_EXPENSES = "CREATE_EXPENSES",
  VIEW_EXPENSES = "VIEW_EXPENSES",
  EDIT_EXPENSES = "EDIT_EXPENSES",
  DELETE_EXPENSES = "DELETE_EXPENSES",

  CREATE_SUPPLIER = "CREATE_SUPPLIER",
  VIEW_SUPPLIER = "VIEW_SUPPLIER",
  EDIT_SUPPLIER = "EDIT_SUPPLIER",
  DELETE_SUPPLIER = "DELETE_SUPPLIER",
  HANDLE_SUPPLIER = "HANDLE_SUPPLIER",

  CREATE_ONLINE_ORDER = "CREATE_ONLINE_ORDER",
  VIEW_ONLINE_ORDER = "VIEW_ONLINE_ORDER",
  EDIT_ONLINE_ORDER = "EDIT_ONLINE_ORDER",
  DELETE_ONLINE_ORDER = "DELETE_ONLINE_ORDER",
  HANDLE_ONLINE_ORDER = "HANDLE_ONLINE_ORDER",

  CREATE_REPORT = "CREATE_REPORT",
  VIEW_REPORT = "VIEW_REPORT",
  EDIT_REPORT = "EDIT_REPORT",
  DELETE_REPORT = "DELETE_REPORT",
  HANDLE_REPORT = "HANDLE_REPORT",

  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface CrudModelI {
  model: Model<any>;
  exempt: string;
}

export const time_stamps = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};

export interface PopulateFieldI {
  model?: string;
  fields?: string;
  second_layer_populate?: PopulateOptions | string;
}
