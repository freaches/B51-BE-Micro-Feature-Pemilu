import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";

export default new (class UserService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(data: any): Promise<object | string> {
    try {
      const usernameCheck = await this.UserRepository.count({
        where :{username: data.username}
      });
      if (usernameCheck > 0) return {message:`Username already used`};
      
      
      const hashPass = await bcrypt.hash(data.password,10)
      
      const obj = await this.UserRepository.create({
        ...data,
        password : hashPass,
        createdAt : new Date(),
        updatedAt : new Date()
      })
      
      const response = await this.UserRepository.save(obj)

      return {
        message: "success creating a User",
        data: response,
      };
    }catch (error) {
      return "message: something error while creating User";
    }
  }
  async login(data: any): Promise<object | string> {
    try {

      const idCheck = await this.UserRepository.findOneBy({
        username: data.username,
      });
      if (!idCheck)
        return { message: "Username did not exist" }
      
    } catch (error) {
      return "message: something error while logging in";
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
      const response = await this.UserRepository.find({ where :{role: "ghost"}, select :[
        "id",
        "name",
        "address",
        "gender",
        "username",
        "role"
      ]
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
      const response = await this.UserRepository.findOne({where: 
        {id: id,
        role: "ghost",}, select :[
          "id",
          "name",
          "address",
          "gender",
          "username",
          "role"
        ]
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
