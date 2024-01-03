import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default new (class AuthService {
  private readonly AuthRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(data: any): Promise<object | string> {
    try {
      const usernameCheck = await this.AuthRepository.count({
        where: { username: data.username },
      });
      if (usernameCheck > 0) return { message: `Username already used` };

      const hashPass = await bcrypt.hash(data.password, 10);

      const obj = await this.AuthRepository.create({
        ...data,
        password: hashPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await this.AuthRepository.save(obj);

      return {
        message: "success creating a User",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating User";
    }
  }
  async login(data: any): Promise<object | string> {
    try {
      const idCheck = await this.AuthRepository.findOneBy({
        username: data.username,
      });
      if (!idCheck) return { message: "Username did not exist" };

      const comparePassword = bcrypt.compare(data.password, idCheck.password);
      if (!comparePassword) return "password is wrong!";

      const obj = this.AuthRepository.create({
        id: idCheck.id,
        name: idCheck.name,
        address: idCheck.address,
        gender: idCheck.gender,
        username: idCheck.username,
        role: idCheck.role
      });

      const token = jwt.sign({ obj }, "LEBATAMAT", { expiresIn: "1h" });
      return {
        message: `Login is suscess`,
        token,
      };
    } catch (error) {
      return "message: something error while logging in";
    }
  }
  async update(id: number, data: any): Promise<object | string> {
    try {
      const response = await this.AuthRepository.update(id, data);
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
      await this.AuthRepository.delete(id);

      return {
        message: "success deleting a User",
      };
    } catch (error) {
      return "message: something error while deleting a User";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const response = await this.AuthRepository.find({
        where: { role: "ghost" },
        select: ["id", "name", "address", "gender", "username", "role"],
      });

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
      const response = await this.AuthRepository.findOne({
        where: { id: id, role: "ghost" },
        select: ["id", "name", "address", "gender", "username", "role"],
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
