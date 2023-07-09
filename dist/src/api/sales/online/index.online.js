"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineSalesIndex = void 0;
const controller_online_1 = require("./main_online/controller.online");
class OnlineSales {
    create_online_sales = controller_online_1.createOnlineSales;
    check_out_sales = controller_online_1.checkOutSales;
    verify_online_sales = controller_online_1.verifyOnlineSales;
    accept_order = controller_online_1.acceptOrder;
    process_order = controller_online_1.processOrder;
    get_one_order_by_staff = controller_online_1.getOneOrderByStaff;
    get_one_order_by_user = controller_online_1.getOneOrderByUser;
    get_many_order_by_staff = controller_online_1.getManyOrderByStaff;
    get_many_order_by_user = controller_online_1.getManyOrderByUser;
    update_order_by_admin = controller_online_1.updateOrderByAdmin;
    update_order_by_staff = controller_online_1.updateOrderByStaff;
    delete_order_by_staff = controller_online_1.deleteOrderByStaff;
    transfer_order = controller_online_1.transferOrder;
    handle_transfer_order = controller_online_1.handleTransferOrder;
}
exports.OnlineSalesIndex = new OnlineSales();
