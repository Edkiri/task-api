import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('todos')
export class Todo extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @Column({ type: 'boolean', default: false })
  important: boolean;
}
