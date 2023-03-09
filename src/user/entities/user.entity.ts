import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column('varchar')
  email: string;

  @Column('varchar', { name: 'display_name' })
  displayName: string;
}
