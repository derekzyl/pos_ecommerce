import { UserI } from "../api/auth/interface_auth/interface.auth";

import { Types } from "mongoose";
export {};
type customParam = ParamsDictionary & { address_id: Types.ObjectId };
declare global {
  namespace Express {
    export interface Request {
      user: UserI;
      params: customParam;
      files: any;
    }
  }
}
