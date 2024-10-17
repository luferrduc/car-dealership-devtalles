import { IsOptional, IsString, IsUUID } from "class-validator"

//* Forma básica 
export class UpdateCarDto {

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string

  @IsString()
  @IsOptional()
  readonly brand?: string

  @IsString()
  @IsOptional()
  readonly model?: string

}