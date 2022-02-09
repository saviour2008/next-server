import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleType {
  Admin = 'admin',
  Visitor = 'visitor',
  Manager = 'manager',
  Operator = 'operator',
}

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column('varchar')
  password: string;

  @Column()
  status: boolean;

  @Column()
  role: RoleType;
}
