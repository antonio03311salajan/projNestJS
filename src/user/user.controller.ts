import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto/create-user-request.dto';
import { TransformInterceptor } from '../public/interceptors/transform.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags()
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @UseInterceptors(new TransformInterceptor(CreateUserResponseDto))
  @ApiOkResponse({ type: CreateUserResponseDto })
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/find-all")
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-email/:email')
  getByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() project: UpdateUserDto,
  ) {
    return this.usersService.update(id, project);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
