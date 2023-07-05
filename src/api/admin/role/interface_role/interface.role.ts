import { Document } from "mongoose";
import { PermissionsE } from "../../../general_factory/interface/general_factory";

export interface RoleI extends Document {
  name: string;
  permissions: PermissionsE[];
}

export enum RoleE {
  USER = "USER",
  STAFF = "STAFF",
  MANAGER = "MANAGER",
  SALES_MANAGER = "SALES_MANAGER",
}
