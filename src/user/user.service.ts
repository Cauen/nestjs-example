import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { ForbiddenException } from 'src/shared/exceptions';
import { CreateUserDTO } from './dto/create-user.dto';
import { EditUserDTO } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {
  }

  async create(doc: CreateUserDTO): Promise<String> {
    // if (!doc.name) return "Nome é obrigatório"
    // if (!doc.age) return "Idade é obrigatório"
    // if (!doc.active) return "Ativo é obrigatório"
    
    const result = await new this.userModel(doc).save();
    return result.id;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({})
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id)
  }

  async update(user: EditUserDTO): Promise<User> {
    return await this.userModel.findByIdAndUpdate(user._id, user)
  }
  
  async err(): Promise<String> {
    const a = Math.random() > 0.5
    if (a) {
      throw new ForbiddenException("Robbiddens");
    }
    return "Passou pelo erro"
  }

  async remove(id: String) {
    const deleted = await this.userModel.findOneAndRemove({ _id: id })
    if (deleted) {
      return { success: "Deletado com sucesso" }
    }
    return { error: "Não deletado" }
  }

  async getFirstUser() {
    const list = await this.findAll()
    return list[0]
  }
}
