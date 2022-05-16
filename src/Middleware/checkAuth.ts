import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(403).json({
      errors: [{ msg: "unauthorized" }],
    });
  }

  token = token.split(" ")[1];

  try {
    const user = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as { email: string };
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [{ msg: "unauthorized" }],
    });
  }
};
