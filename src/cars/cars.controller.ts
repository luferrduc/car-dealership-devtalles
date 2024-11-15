import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
// @UsePipes(ValidationPipe) -> parra usar a nivel de controlador
export class CarsController {

  constructor(
    private readonly carsService: CarsService
  ) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  //* Se puede personalizar el UUID versión en el pipe
  //* creando una instancia new ParseUUIDPipe({ version: 6 })
  @Get(':id')
  getCarById( @Param('id', ParseUUIDPipe) id: string ) {
    console.log({ id: id })  
    return this.carsService.findOneById(id)
  }

  @Post()
  // @UsePipes(ValidationPipe) -> para usar a nivel de ruta
  createCar( @Body() createCarDto: CreateCarDto ) {
    return this.carsService.create(createCarDto)
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCarDto: UpdateCarDto) 
  {
    return this.carsService.update(id, updateCarDto)
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id)
  }
}
