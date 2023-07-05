import {
  createNotification,
  deleteNotification,
  getManyNotification,
  getOneNotification,
  updateNotification,
  updateReadNotification,
} from "./main_notification/controller.notification";

class Notification {
  public create_notification = createNotification;
  public get_one_notification = getOneNotification;
  public get_all_notification = getManyNotification;
  public update_notification = updateNotification;
  public delete_notification = deleteNotification;
  public read_receipt_notification = updateReadNotification;
}
export const NotificationIndex = new Notification();
