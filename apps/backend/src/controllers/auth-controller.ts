import type { Request, Response, NextFunction } from "express";
import { authSchema } from "../types/auth-schema";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/jwt";
import { prisma } from "db";
import { registerUserInEngine } from "../redis/sendToEngine";
import { logger } from "../utils/logger";

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsedParams = authSchema.safeParse(req.body);

  if (parsedParams.error) {
    res.status(411).json({
      errors: parsedParams.error,
    });
    return;
  }
  logger.info("Request recived ");

  const { username, password } = parsedParams.data;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const savedUser = await prisma.users.create({
      data: {
        username: username,
        password: encryptedPassword,
      },
    });

    const engineRes = await registerUserInEngine(savedUser.id);

    console.log("Engine Response from queue");
    console.log(engineRes);
    console.log(typeof engineRes);
    res.status(201).json({
      username: savedUser.username,
      userId: savedUser.id,
      token: generateJwtToken({
        id: savedUser.id.toString(),
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({
      error: "user already exist",
    });
  }
}

export async function signin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsedParams = authSchema.safeParse(req.body);

  if (parsedParams.error) {
    res.status(401).json({
      error: parsedParams.error,
    });
    return;
  }
  logger.info("Request recived ");
  const { username, password } = parsedParams.data;

  try {
    const user = await prisma.users.findUniqueOrThrow({
      where: {
        username,
      },
    });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        error: "Invalid password",
      });
      return;
    }

    res.status(200).json({
      userId: user.id,
      token: generateJwtToken({
        id: user.id.toString(),
      }),
    });
  } catch {
    res.status(404).json({
      error: "user not found",
    });
  }
}
