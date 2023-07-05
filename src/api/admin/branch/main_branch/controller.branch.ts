import { GeneralIndex } from "../../../general_factory/index.factory";
import { BRANCH } from "./model.branch";

export const createBranch = GeneralIndex.createOneFactory(BRANCH);
export const getOneBranch = GeneralIndex.getOneFactory(BRANCH);
export const updateBranch = GeneralIndex.updateOneFactory(BRANCH);
export const deleteBranch = GeneralIndex.deleteOneFactory(BRANCH);
export const getAllBranch = GeneralIndex.getAllFactory(BRANCH);
