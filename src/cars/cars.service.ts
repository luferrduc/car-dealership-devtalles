import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla'
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic'
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee'
    }
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find(car => car.id === id)
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`)
    return car
  }
  
  create(createCarDto: CreateCarDto) {

    const exists = this.cars.find( car => {
      return car.brand.toLowerCase() === createCarDto.brand.toLowerCase() 
              && car.model.toLowerCase() === createCarDto.model.toLowerCase()
    })

    if(exists) throw new BadRequestException(`Car '${createCarDto.brand}' model '${createCarDto.model} already exists'`)

    const car: Car = { 
      id: uuid(), 
      ...createCarDto 
    }
    this.cars.push(car)
    return car;
  }

}
