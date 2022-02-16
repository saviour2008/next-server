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

  @Column({ length: 11 })
  phone: string;

  // 加密后的密码
  @Column('text') //  { select: false }这个属性的意义
  password: string;

  // 加密盐
  @Column('text') //  { select: false }这个属性的意义
  salt: string;

  @Column({ default: true })
  status: boolean;

  @Column({ default: 'visitor' })
  role: RoleType;
}
