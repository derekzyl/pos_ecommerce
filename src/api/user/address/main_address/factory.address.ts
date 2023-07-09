import { ADDRESS } from "./model.address";

import { AddressBodyT } from "../interface_address/interface.address";

import { phone_regex } from "../../../../utilities/regex";
import { APP_ERROR } from "../../../../utilities/custom_error";
import { UserI } from "../../../auth/interface_auth/interface.auth";

export async function createAddressFactory(body: AddressBodyT, user: UserI) {
  const regex_check = phone_regex.test(body.phone);
  if (!regex_check) {
    throw APP_ERROR("invalid phone number");
  }

  // find the  user address length
  const get_addresses = await ADDRESS.find({ user: user.id });
  if (!get_addresses || get_addresses.length < 1) {
    body.is_default = true;
  }
  const create_address = await ADDRESS.create({ ...body, user: user.id });
  return create_address;
}
