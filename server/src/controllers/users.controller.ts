import { Request, Response } from "express";

import createUserService from "../services/users/createUser.service";
import listAllUsersService from "../services/users/listAllUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import completeUserService from "../services/users/completeUser.service";
import addAddressService from "../services/users/addAddress.service";

export default class UsersController {
  async store(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const newUser = await createUserService({
        username: username,
        email: email,
        password: password,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async data(req: Request, res: Response) {
    const { id } = req.params;
    const { full_name, birthdate, cpf } = req.body;

    try {
      const completeUser = await completeUserService({
        user_id: id,
        full_name: full_name,
        birthdate: birthdate,
        cpf: cpf,
      });
      console.log(completeUser);
      return res.status(201).json(completeUser);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  async address(req: Request, res: Response) {
    const { id } = req.params;
    const { postal_code, street, district, city, state, country } = req.body;

    try {
      const completeAddress = await addAddressService({
        user_id: id,
        postal_code: postal_code,
        street: street,
        district: district,
        city: city,
        state: state,
        country: country,
      });

      return res.status(201).json(completeAddress);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const users = await listAllUsersService();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await deleteUserService({ id });

      return res.status(200).json({ message: "Account deleted" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
