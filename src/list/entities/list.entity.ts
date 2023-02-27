import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('lists')
export class List extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  slug_name: string;
}
