import { Router } from "express";
import { NotificationIndex } from "../index.notification";
import { AuthIndex } from "../../auth/index.auth";

const notificationRouter = Router();

notificationRouter
  .route("/")
  .post(
    AuthIndex.protector,

    NotificationIndex.create_notification
  )
  .get(
    AuthIndex.protector,

    NotificationIndex.get_all_notification
  );
notificationRouter
  .route("/:id")
  .get(
    AuthIndex.protector,

    NotificationIndex.get_one_notification
  )
  .patch(
    AuthIndex.protector,

    NotificationIndex.update_notification
  )
  .delete(AuthIndex.protector, NotificationIndex.delete_notification);

export default notificationRouter;
