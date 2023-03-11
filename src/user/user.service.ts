import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUserFromGoogle(
    email: string,
    displayName: string,
    avatarUrl?: string,
  ) {
    const newUser = this.userRepo.create({ email, displayName, avatarUrl });
    return this.userRepo.save(newUser);
  }

  async create(data: CreateUserDto) {
    const oldEmailUser = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (oldEmailUser) {
      throw new BadRequestException(
        'An account with this email already exists',
      );
    }
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashPassword;
    const user = await this.userRepo.save(newUser);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async findOneOrFail(id: number) {
    const user = this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id '${id}' not found`);
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepo.findOneOrFail({
      where: { id },
    });
    this.userRepo.merge(user, data);
    return this.userRepo.save(user);
  }
}
