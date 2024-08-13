import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string){
    if (!email || !password) {
      throw new UnauthorizedException('UNAUTHORIZED! Invalid credentials');
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('UNAUTHORIZED! Invalid credentials');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('UNAUTHORIZED! Invalid credentials');
    }

    return user;
  }

  async login(user: AuthLoginDto) {
    const foundUser = await this.validateUser(user.email, user.password);

    const payload = { email: foundUser.email, id: foundUser.id };

    return {
        success: true,
        access_token: this.jwtService.sign(payload),
    };
  }
}