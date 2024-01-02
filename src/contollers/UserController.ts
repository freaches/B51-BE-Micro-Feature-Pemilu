import { Request, Response } from "express";
import UserService from "../services/UserService";
import {createUserSchema} from "../utils/validator/UserValidator";



export default new (class UserController {

  async register(req: Request, res: Response) {
    UserService.register(req, res)
  }
  async login(req: Request, res: Response) {
    UserService.login(req, res)
  }
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid ID provided",
          error: "Invalid input for type number",
        });
      }
      const data = {
        name : req.body.name,
        address : req.body.address,
        gender : req.body.gender,
        role : req.body.role
      };
      const { error, value } = createUserSchema.validate(data)
      if(error) return res.status(400).json(error)

      const response = await UserService.update(id, value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a Article:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid ID provided",
          error: "Invalid input for type number",
        });
      }

      const response = await UserService.delete(id);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a Article:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const response = await UserService.getAll();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting all User:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await UserService.getOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting a Article:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
});
