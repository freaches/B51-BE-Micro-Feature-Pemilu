import { Repository } from "typeorm";
import { Vote } from "../entity/Vote";
import { AppDataSource } from "../data-source";

export default new (class VoteService {
  private readonly VoteRepository: Repository<Vote> =
    AppDataSource.getRepository(Vote);

  async create(data: any): Promise<object | string> {
    try {
      const checkVoter = await this.VoteRepository.countBy({
        user: { id: data.user },
      });
      if (checkVoter) return `Vote has already been done`;

      const response = await this.VoteRepository.save(data);

      return {
        message: "success voting",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating a new Vote";
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
      const countVoters = await this.VoteRepository.count();
      return {
        message: "success getting all Vote",
        jumlahVoters: countVoters,
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
