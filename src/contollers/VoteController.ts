import { Request, Response } from "express";
import VoteService from "../services/VoteService";
import createvVoteSchema from "../utils/validator/VoteValidator";

export default new (class VoteController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body
      const { error, value } = createvVoteSchema.validate(data)

      if(error) return res.status(400).json(error)

      const response = await VoteService.create(value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a Vote:", error);
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
      const data = req.body;
      const response = await VoteService.update(id, data);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error updating a Vote:", error);
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

      const response = await VoteService.delete(id);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error deleting a Vote:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const response = await VoteService.getAll();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting all Vote:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await VoteService.getOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting a Vote:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
});