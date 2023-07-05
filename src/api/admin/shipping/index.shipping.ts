import {
  addShippingFee,
  deleteShippingFee,
  getAllShippingFee,
  updateShippingFee,
  fetchCountryAndState,
  getOneShippingFee,
} from "./main_shipping/controller.shipping";

class Shipping {
  public create_shipping = addShippingFee;
  public get_all_shipping_fee = getAllShippingFee;
  public get_one_shipping_fee = getOneShippingFee;

  public update_shipping_fee = updateShippingFee;
  public delete_shipping_fee = deleteShippingFee;
  public fetch_country_and_state = fetchCountryAndState;
}
export const ShippingIndex = new Shipping();
