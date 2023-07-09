import {
  createVat,
  deleteVat,
  getManyVat,
  getOneVat,
  updateVat,
} from "./main_vat/controller.vat";

class Vat {
  public create_vat = createVat;
  public get_one_vat = getOneVat;
  public get_all_vat = getManyVat;
  public update_vat = updateVat;
  public delete_vat = deleteVat;
}
export const VatIndex = new Vat();
