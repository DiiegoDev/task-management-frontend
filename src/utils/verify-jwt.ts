import jwt from "jsonwebtoken";

export function verifyJwt(token: string) {
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as jwt.Secret);
    return true;
  } catch (error) {
    return false;
  }
}
