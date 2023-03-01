import { BaseEntity } from 'src/database/entities/base.entity';
import { List } from 'src/list/entities/list.entity';
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

  @ManyToOne(() => List, { nullable: true })
  @JoinColumn({ name: 'list_id' })
  list?: List;
}
