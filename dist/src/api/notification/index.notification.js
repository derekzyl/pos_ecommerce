"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationIndex = void 0;
const controller_notification_1 = require("./main_notification/controller.notification");
class Notification {
    create_notification = controller_notification_1.createNotification;
    get_one_notification = controller_notification_1.getOneNotification;
    get_all_notification = controller_notification_1.getManyNotification;
    update_notification = controller_notification_1.updateNotification;
    delete_notification = controller_notification_1.deleteNotification;
    read_receipt_notification = controller_notification_1.updateReadNotification;
}
exports.NotificationIndex = new Notification();
