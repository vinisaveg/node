import { Request, Response } from "express";

import { getRepository } from "typeorm";

import User from "../models/User";

class UserController {
  index(request: Request, response: Response) {
    return response.send({ userId: request.userId });
  }

  async store(request: Request, response: Response) {
    const repository = getRepository(User);

    const { email, password } = request.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return response.status(409).send("This email is already taken");
    }

    const newUser = repository.create({ email, password });
    await repository.save(newUser);

    return response.json(newUser);
  }
}

export default new UserController();
