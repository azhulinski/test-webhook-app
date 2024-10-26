import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class GoogleSheets {

  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  sheetName: string;

  @ApiProperty()
  @Column()
  row: number;

  @ApiProperty()
  @Column()
  column: number;

  @ApiProperty()
  @Column()
  value: string;

  @ApiProperty()
  @Column()
  email: string;

}