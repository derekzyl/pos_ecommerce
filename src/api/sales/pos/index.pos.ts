import {
  createPos,
  deletePos,
  getManyPos,
  getOnePos,
  updatePos,
  getManyPosProduct,
} from "./main_pos/controller.pos";

class Pos {
  public create_pos = createPos;
  public get_one_pos = getOnePos;
  public get_all_pos = getManyPos;
  public update_pos = updatePos;
  public delete_pos = deletePos;
  public get_products = getManyPosProduct;
}
export const PosIndex = new Pos();
