import { Repository } from "typeorm";
import { Articles } from "../entity/Articles";
import { AppDataSource } from "../data-source";

export default new (class ArticlesService {
  private readonly ArticlesRepository: Repository<Articles> =
    AppDataSource.getRepository(Articles);

  async create(data: any): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.save({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

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
      if (typeof data.image === "undefined") {
        const imageDb = await this.ArticlesRepository.findOneBy({ id });
        data.image = imageDb[0].image;
      }
      const response = await this.ArticlesRepository.update(id, {
        ...data,
        updatedAt: new Date(),
      });
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
      const response = await this.ArticlesRepository.find({
        relations: {
          user: true,
        },
        select: {
          user: {
            name: true,
          },
        },
      });
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
      const response = await this.ArticlesRepository.findOne({
        where: { id },
        relations: {
          user: true,
        },
        select: {
          user: {
            name: true,
          },
        },
      });

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
        relations: {
          user: true,
        },
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          user: {
            name: true,
          },
        },
      });

      return {
        message: "success getting all Cards Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting Cards Articles";
    }
  }
  async getOneArticlesCard(id: number): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.find({
        where: { id },
        relations: {
          user: true,
        },
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          user: {
            name: true,
          },
        },
      });

      return {
        message: "success getting a Card Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting Cards Articles";
    }
  }
})();
