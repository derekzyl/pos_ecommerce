import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./controller.factory";
import { getPermissions } from "./permission_handler";

class GeneralFactory {
  public createOneFactory = createOne;
  public deleteOneFactory = deleteOne;
  public updateOneFactory = updateOne;
  public getOneFactory = getOne;
  public getAllFactory = getAll;
  public getUserPermissions = getPermissions;
}


export const GeneralIndex = new GeneralFactory()