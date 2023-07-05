import { APP_ERROR } from "./custom_error";

export function n(nr: number) {
  if (Number.isNaN(nr)) throw APP_ERROR("this not a number");

  return Number(Number(nr).toFixed(2));
}
