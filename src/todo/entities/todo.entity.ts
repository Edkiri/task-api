import { BaseEntity } from 'src/database/entities/base.entity';
import { List } from 'src/list/entities/list.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('todos')
export class Todo extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @Column({ type: 'boolean', default: false })
  important: boolean;

  @Column({ type: 'boolean', default: false })
  today: boolean;

  @Column({ type: 'timestamp', nullable: true })
  expiresOn: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => List, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list?: List;
}
