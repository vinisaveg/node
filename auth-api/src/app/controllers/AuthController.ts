import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import env from "../../environment/env";

import User from "../models/User";

class AuthController {
  async authenticate(request: Request, response: Response) {
    const repository = getRepository(User);

    const { email, password } = request.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return response.status(401).send("Email or Password is incorrect");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.status(401).send("Email or Password is incorrect");
    }

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const responseUser = {
      id: user.id,
      email: user.email,
    };

    return response.json({
      user: responseUser,
      token,
    });
  }
}

export default new AuthController();
