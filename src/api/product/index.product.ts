import {
  createProduct,
  deleteProduct,
  getManyProduct,
  getOneProduct,
  updateProduct,
} from "./main_product/controller.product";

class Product {
  public create_product = createProduct;
  public get_one_product = getOneProduct;
  public get_all_product = getManyProduct;
  public update_product = updateProduct;
  public delete_product = deleteProduct;
}
export const ProductIndex = new Product();
