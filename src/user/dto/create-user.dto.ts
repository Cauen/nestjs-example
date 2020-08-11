import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: "O nome do usuário é obrigatório para criá-lo" })
  readonly name: string;

  @IsNotEmpty({ message: "A idade do usuário é obrigatória para criá-la" })
  readonly age: number;

  @IsNotEmpty({ message: "O status de atividade do usuário é obrigatório para criá-lo" })
  readonly active: boolean;
}