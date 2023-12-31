import { Repository } from "typeorm";
import { Articles } from "../entity/Articles";
import { AppDataSource } from "../data-source";

export default new (class ArticlesService {
  private readonly ArticlesRepository: Repository<Articles> =
    AppDataSource.getRepository(Articles);

  async create(data: any): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.save(data);

      return {
        message: "success creating a new Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating a new Articles";
    }
  }
  async update(id: number, data: any): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.update(id, data);
      return {
        message: "success updating a Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while updating a Articles";
    }
  }
  async delete(id: number): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.delete(id);

      return {
        message: "success deleting a Articles",
      };
    } catch (error) {
      return "message: something error while deleting a Articles";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.find();

      return {
        message: "success getting all Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting all Articles";
    }
  }
  async getOne(id: number): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.findBy({ id });

      return {
        message: "success getting a Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting a Articles";
    }
  }
  async getAllArticlesCard(): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.find({
        select: [
          'id',
          'title',
          'image',
          'date',
        ],
      });

      return {
        message: "success getting Cards Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting Cards Articles";
    }
  }
  async getOneArticlesCard(id: number): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.find({where:{id}, select: [
        'id',
        'title',
        'image',
        'date',
      ]})

      return {
        message: "success getting Cards Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting Cards Articles";
    }
  }
})();
