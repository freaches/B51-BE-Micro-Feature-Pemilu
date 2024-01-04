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
})
