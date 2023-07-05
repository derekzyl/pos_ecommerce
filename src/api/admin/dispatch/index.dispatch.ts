import {
  createDispatch,
  deleteDispatch,
  getManyDispatchByStaff,
  getManyDispatchByUser,
  getOneDispatchByStaff,
  getOneDispatchByUser,
  updateDispatchByDispatcher,
  updateDispatchByUser,
} from "./main_dispatch/controller.dispatch";

class Dispatch {
  public create_dispatch = createDispatch;
  public get_one_dispatch_by_staff = getOneDispatchByStaff;
  public get_one_dispatch_by_user = getOneDispatchByUser;
  public get_all_dispatch_by_staff = getManyDispatchByStaff;
  public get_all_dispatch_by_user = getManyDispatchByUser;
  public update_dispatch_by_dispatcher = updateDispatchByDispatcher;
  public update_dispatch_by_user = updateDispatchByUser;
  public delete_dispatch = deleteDispatch;
}
export const DispatchIndex = new Dispatch();
