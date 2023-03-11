import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Exclude()
  @Column('varchar')
  email: string;

  @Column('varchar', { name: 'display_name' })
  displayName: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  avatarUrl: string;
}
