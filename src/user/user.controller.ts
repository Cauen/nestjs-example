import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ControllerResponse } from 'src/shared/interfaces/controllerResponse';
import { CreateUserDTO } from './dto/create-user.dto';
import { EditUserDTO } from './dto/edit-user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {
  }

  @Get()
  async getAll(): Promise<ControllerResponse> {
    const res: User[] = await this.service.findAll();
    return { data: res }
  }

  @Get(':id')
  async get(@Param() params): Promise<ControllerResponse> {
    const user =  await this.service.findById(params.id);
    return { data: user }
  }

  @Post()
  async create(@Body() user: CreateUserDTO): Promise<ControllerResponse> {
    const created = await this.service.create(user);
    return { data: created }
  }

  @Get('error')
  async getError(): Promise<ControllerResponse> {
    const a = await this.service.err();
    return { data: a }
  }

  @Put()
  async update(@Body() user: EditUserDTO): Promise<ControllerResponse> {
    await this.service.update(user);
    const userSaved = await this.service.findById(user._id)
    return { data: userSaved, success: "Usuário atualizado com sucesso" }
  }

  @Delete(':id')
  async remove(@Param() params): Promise<ControllerResponse> {
    return await this.service.remove(params.id);
  }
}
