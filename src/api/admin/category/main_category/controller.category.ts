import { GeneralIndex } from "../../../general_factory/index.factory";
import { CATEGORY, SUB_CATEGORY } from "./model.category";

export const createCategory = GeneralIndex.createOneFactory(CATEGORY);
export const getOneCategory = GeneralIndex.getOneFactory(CATEGORY);
export const updateCategory = GeneralIndex.updateOneFactory(CATEGORY);
export const deleteCategory = GeneralIndex.deleteOneFactory(CATEGORY);
export const getAllCategory = GeneralIndex.getAllFactory(CATEGORY);

export const createSubCategory = GeneralIndex.createOneFactory(SUB_CATEGORY);
export const getOneSubCategory = GeneralIndex.getOneFactory(SUB_CATEGORY);
export const updateSubCategory = GeneralIndex.updateOneFactory(SUB_CATEGORY);
export const deleteSubCategory = GeneralIndex.deleteOneFactory(SUB_CATEGORY);
export const getAllSubCategory = GeneralIndex.getAllFactory(SUB_CATEGORY);
