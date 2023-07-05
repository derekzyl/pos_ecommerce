"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryIndex = exports.CategoryIndex = void 0;
const controller_category_1 = require("./main_category/controller.category");
class Category {
    create_category = controller_category_1.createCategory;
    get_one_category = controller_category_1.getOneCategory;
    update_category = controller_category_1.updateCategory;
    delete_category = controller_category_1.deleteCategory;
    get_all_category = controller_category_1.getAllCategory;
}
class SubCategory {
    create_sub_category = controller_category_1.createSubCategory;
    get_one_sub_category = controller_category_1.getOneSubCategory;
    update_sub_category = controller_category_1.updateSubCategory;
    delete_sub_category = controller_category_1.deleteSubCategory;
    get_all_sub_category = controller_category_1.getAllSubCategory;
}
exports.CategoryIndex = new Category();
exports.SubCategoryIndex = new SubCategory();
