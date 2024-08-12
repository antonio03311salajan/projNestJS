import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable:false, unique: true})
  email: string;

  @Column()
  password: string;

  @Column({default:"user"})
  role: string
}