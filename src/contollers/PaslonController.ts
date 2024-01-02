import { Request, Response } from "express";
import PaslonService from "../services/PaslonService";
import createPaslonSchema from "../utils/validator/PaslonValidator";
import cloudinary from "../libs/cloudinary";

export default new (class PaslonController {
  async create(req: Request, res: Response) {
    try {
      const data = {
        name: req.body.name,
        numberPaslon: req.body.numberPaslon,
        visionMission: req.body.visionMission,
        partai : req.body.partai,
        image: res.locals.filename,
      };
      const { error, value } = createPaslonSchema.validate(data);
      if (error) return res.status(400).json(error);

      cloudinary.upload();
      const cloudinaryRes = await cloudinary.destination(value.image);
      const obj = {
        ...value,
        image: cloudinaryRes.secure_url,
      };

      const response = await PaslonService.create(obj);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a Paslon:", error);
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
        numberPaslon: req.body.numberPaslon,
        visionMission: req.body.visionMission,
        image: res.locals.filename,
      };
      const { error, value } = createPaslonSchema.validate(data);
      if (error) return res.status(400).json(value);

      const response = await PaslonService.update(id, value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error updating a Paslon:", error);
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

      const response = await PaslonService.delete(id);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error deleting a Paslon:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const response = await PaslonService.getAll();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting all Paslon:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await PaslonService.getOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting a Paslon:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
})();
