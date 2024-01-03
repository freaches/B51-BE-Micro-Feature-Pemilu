import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { createUserSchema, loginUserSchema } from "../utils/validator/AuthValidator";

export default new (class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = createUserSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await AuthService.register(value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a user", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = loginUserSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await AuthService.login(value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error logging in", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
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
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
        role: req.body.role,
      };
      const { error, value } = createUserSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await AuthService.update(id, value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error updating a User:", error);
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

      const response = await AuthService.delete(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error deleting a user", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const response = await AuthService.getAll();
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
      const response = await AuthService.getOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting a user:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
})();
