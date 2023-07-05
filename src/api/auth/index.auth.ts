import {
  forgotPassword,
  login,
  logout,
  protector,
  resetPassword,
  signup,
  updatePassword,
  verifyEmail,
} from "./main_auth/controller.auth";

class Auth {
  public signup = signup;
  public verify_email = verifyEmail;
  public login = login;
  public protector = protector;
  public logout = logout;
  public forgot_password = forgotPassword;
  public reset_password = resetPassword;
  public update_password = updatePassword;
}
export const AuthIndex = new Auth();
