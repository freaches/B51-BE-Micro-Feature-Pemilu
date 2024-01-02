import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import {createUserSchema , loginUserSchema}from "../utils/validator/UserValidator";

export default new (class UserService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = createUserSchema.validate(data);
      if (error) return res.status(400).json(error);

      const usernameCheck = await this.UserRepository.findOneBy({
        username: value.username,
      });
      if (usernameCheck)
        return res.status(400).json({ message: "Username already used" });

      bcrypt.hash(value.password, 10, async (error: any, hash: string) => {
        if (error) {
          return "message: password failed to be hashing";
        }

        const response = await this.UserRepository.save({
          ...data,
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return res
          .status(201)
          .json({ message: "Register Success", data: response });
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = loginUserSchema.validate(data);
      if (error) return res.status(400).json(error);

      const idCheck = await this.UserRepository.findOneBy({
        username: value.username,
      });
      if (!idCheck)
        return res.status(400).json({ message: "Username did not exist" });
      
      bcrypt.compare(value.password, idCheck.password, async (err : any , result : boolean) =>{
        if(!result) {return res.status(400).json({message :"Password is wrong"})};

        return res.status(200).json({message :"Login is successful"})
      })
      
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  async update(id: number, data: any): Promise<object | string> {
    try {
      const response = await this.UserRepository.update(id, data);
      return {
        message: "success updating a User",
        data: response,
      };
    } catch (error) {
      return "message: something error while updating a User";
    }
  }
  async delete(id: number): Promise<object | string> {
    try {
      await this.UserRepository.delete(id);

      return {
        message: "success deleting a User",
      };
    } catch (error) {
      return "message: something error while deleting a User";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const response = await this.UserRepository.findBy({ role: "ghost" });

      return {
        message: "success getting all Peserta pemilu",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting all User";
    }
  }
  async getOne(id: number): Promise<object | string> {
    try {
      const response = await this.UserRepository.findOneBy({
        id: id,
        role: "ghost",
      });

      return {
        message: "success getting a User",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting a Peserta Pemilu";
    }
  }
})();
