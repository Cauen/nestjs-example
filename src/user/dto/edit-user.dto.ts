import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class EditUserDTO {
  @IsNotEmpty({ message: "O ID do usuário é obrigatório para editá-lo" })
  readonly _id: string;

  @IsOptional()
  readonly name: string;

  @IsOptional({ message: "A idade do usuário é opcional para criá-la" })
  @IsNumber({allowNaN: false}, {message: "A idade deve ser numérica"})
  readonly age: number;

  @IsOptional({ message: "O status de atividade do usuário é opcional para criá-lo" })
  readonly active: boolean;
}