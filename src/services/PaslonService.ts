import { Repository } from "typeorm";
import { Paslon } from "../entity/Paslon";
import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";

export default new (class PaslonService {
  private readonly PaslonRepository: Repository<Paslon> =
    AppDataSource.getRepository(Paslon);

  async create(data: any): Promise<object | string> {
    try {
      let countPaslon = await this.PaslonRepository.count();
      if (
        data.numberPaslon < countPaslon + 1 ||
        data.numberPaslon > countPaslon + 1
      )
        return `masukan nomor urut paslon sesuai, yaitu ${countPaslon + 1}`;
      
        cloudinary.upload();
        const cloudinaryRes = await cloudinary.destination(data.image);
        
        const obj = await this.PaslonRepository.create({
          ...data,
          image: cloudinaryRes.secure_url,
        });
  

      const response = await this.PaslonRepository.save(obj);

      return {
        message: "success creating a new Paslon",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating a new Paslon";
    }
  }
  async update(id: number, data: any): Promise<object | string> {
    try {
      const response = await this.PaslonRepository.update(id, data);
      return {
        message: "success updating a Paslon",
        data: response,
      };
    } catch (error) {
      return "message: something error while updating a Paslon";
    }
  }
  async delete(id: number): Promise<object | string> {
    try {
      const response = await this.PaslonRepository.delete(id);

      return {
        message: "success deleting a Paslon",
      };
    } catch (error) {
      return "message: something error while deleting a Paslon";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const response = await this.PaslonRepository.find({
        relations: ["partai"],
        select: {
          partai: {
            name: true,
          },
        },
      });

      return {
        message: "success getting all Paslon",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting all Paslon";
    }
  }
  async getOne(id: number): Promise<object | string> {
    try {
      const response = await this.PaslonRepository.find({where : {id : id},
        relations: ["partai"],
        select: {
          partai: {
            name: true,
          },
        },
      });

      return {
        message: "success getting a Paslon",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting a Paslon";
    }
  }
})();
