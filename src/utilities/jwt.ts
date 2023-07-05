import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

class JWT {
  private static secret: string | any = process.env.JWT_SECRET;
  public static generateToken(payload: any, options?: jwt.SignOptions): string {
    return jwt.sign(payload, this.secret, options);
  }
  public static verifyToken(
    token: string,

    options?: jwt.VerifyOptions
  ): any {
    return jwt.verify(token, this.secret, options);
  }
}
export default JWT;
