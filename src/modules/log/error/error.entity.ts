import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleType {
  Admin = 'admin',
  Visitor = 'visitor',
  Manager = 'manager',
  Operator = 'operator',
}

@Entity({ name: 'errors' })
export class ErrorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column('varchar')
  message: string;

  @Column('varchar')
  url: string;

  @Column('varchar')
  timestamp: string;
}
