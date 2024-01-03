import { Repository } from "typeorm";
import { Vote } from "../entity/Vote";
import { AppDataSource } from "../data-source";

export default new (class VoteService {
  private readonly VoteRepository: Repository<Vote> =
    AppDataSource.getRepository(Vote);

  async create(data: any): Promise<object | string> {
    try {
      const response = await this.VoteRepository.save(data);

      return {
        message: "success creating a new Vote",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating a new Vote";
    }
  }
  async update(id: number, data: any): Promise<object | string> {
    try {
      const response = await this.VoteRepository.update(id, data);
      return {
        message: "success updating a Vote",
        data: response,
      };
    } catch (error) {
      return "message: something error while updating a Vote";
    }
  }
  async delete(id: number): Promise<object | string> {
    try {
      const response = await this.VoteRepository.delete(id);

      return {
        message: "success deleting a Vote",
      };
    } catch (error) {
      return "message: something error while deleting a Vote";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const response = await this.VoteRepository.find({
        relations: ["user", "paslon"],
        select: {
          user: {
            name: true,
            address: true,
            gender: true,
          },
          paslon: {
            name: true,
          },
        },
      });

      return {
        message: "success getting all Vote",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting all Vote";
    }
  }
  async getOne(id: number): Promise<object | string> {
    try {
      const response = await this.VoteRepository.findOne({
        where: { id },
        relations: ["user", "paslon"],
        select: {
          user: {
            name: true,
            address: true,
            gender: true,
          },
          paslon: {
            name: true,
          },
        },
      });

      return {
        message: "success getting a Vote",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting a Vote";
    }
  }
})();
