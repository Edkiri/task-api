import { ISession } from 'connect-typeorm/out';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity('sessions')
export class SessionEntity implements ISession {
  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Index()
  @Column('bigint')
  expiredAt: number = Date.now();

  @Column('text')
  json: string;

  @DeleteDateColumn()
  destroyedAt: Date;
}
