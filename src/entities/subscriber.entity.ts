import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

@Entity()
export class Subscriber {

  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true })
  @Column()
  @IsEmail()
  subscriber: string;

}