import { Repository } from "typeorm";
import { Partai } from "../entity/Partai";
import { AppDataSource } from "../data-source";

export default new (class PartaiService {
  private readonly PartaiRepository: Repository<Partai> =
    AppDataSource.getRepository(Partai);

  async create(data: any): Promise<object | string> {
    try {
      const response = await this.PartaiRepository.save(data);

      return {
        message: "success creating a new Partai",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating a new Partai";
    }
  }
  async update(id: number, data: any): Promise<object | string> {
    try {
      const response = await this.PartaiRepository.update(id, data);
      return {
        message: "success updating a Partai",
        data: response,
      };
    } catch (error) {
      return "message: something error while updating a Partai";
    }
  }
  async delete(id: number): Promise<object | string> {
    try {
      const response = await this.PartaiRepository.delete(id);

      return {
        message: "success deleting a Partai",
      };
    } catch (error) {
      return "message: something error while deleting a Partai";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const response = await this.PartaiRepository.find();

      return {
        message: "success getting all Partai",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting all Partai";
    }
  }
  async getOne(id: number): Promise<object | string> {
    try {
      const response = await this.PartaiRepository.findBy({ id });

      return {
        message: "success getting a Partai",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting a Partai";
    }
  }
})();
