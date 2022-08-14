import { Router } from "express";

import UsersController from "../controllers/users.controller";

const usersController = new UsersController();

const userRoutes = Router();

//list all users
userRoutes.get("/", usersController.index);
//list one user
userRoutes.get("/:id");
//register user
userRoutes.post("/", usersController.store);
//complete user data
userRoutes.post("/:id", usersController.data);
// add address to data
userRoutes.post("/address/:data_id");

//update user
userRoutes.patch("/:id");
//delete account
userRoutes.delete("/:id", usersController.delete);

export default userRoutes;
