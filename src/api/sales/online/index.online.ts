import {
  acceptOrder,
  checkOutSales,
  createOnlineSales,
  deleteOrderByStaff,
  getManyOrderByStaff,
  getManyOrderByUser,
  getOneOrderByStaff,
  getOneOrderByUser,
  handleTransferOrder,
  processOrder,
  transferOrder,
  updateOrderByAdmin,
  updateOrderByStaff,
  verifyOnlineSales,
} from "./main_online/controller.online";

class OnlineSales {
  public create_online_sales = createOnlineSales;
  public check_out_sales = checkOutSales;
  public verify_online_sales = verifyOnlineSales;
  public accept_order = acceptOrder;
  public process_order = processOrder;
  public get_one_order_by_staff = getOneOrderByStaff;
  public get_one_order_by_user = getOneOrderByUser;
  public get_many_order_by_staff = getManyOrderByStaff;
  public get_many_order_by_user = getManyOrderByUser;
  public update_order_by_admin = updateOrderByAdmin;
  public update_order_by_staff = updateOrderByStaff;

  public delete_order_by_staff = deleteOrderByStaff;

  public transfer_order = transferOrder;
  public handle_transfer_order = handleTransferOrder;
}

export const OnlineSalesIndex = new OnlineSales();
