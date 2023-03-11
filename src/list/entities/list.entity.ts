import { BaseEntity } from 'src/database/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('lists')
export class List extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'slug_name', type: 'varchar', length: 255 })
  slugName: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
