import {
  createAddress,
  deleteAddress,
  getManyAddress,
  updateAddress,
  getOneAddress,
} from "./main_address/controller.address";

class Address {
  public createAddress = createAddress;
  public getAllAddress = getManyAddress;
  public updateAddress = updateAddress;
  public deleteAddress = deleteAddress;
  public getOneAddress = getOneAddress;
}
export const AddressIndex = new Address();
