import {
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  createSubCategory,
  getOneSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategory,
} from "./main_category/controller.category";

class Category {
  public create_category = createCategory;
  public get_one_category = getOneCategory;
  public update_category = updateCategory;
  public delete_category = deleteCategory;
  public get_all_category = getAllCategory;
}

class SubCategory {
  public create_sub_category = createSubCategory;
  public get_one_sub_category = getOneSubCategory;
  public update_sub_category = updateSubCategory;
  public delete_sub_category = deleteSubCategory;
  public get_all_sub_category = getAllSubCategory;
}

export const CategoryIndex = new Category();
export const SubCategoryIndex = new SubCategory();
