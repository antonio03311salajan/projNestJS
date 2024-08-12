import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassType<T> {
  new (): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(private readonly classType: ClassType<T>) {}

  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next
      .handle()
      .pipe(map((data) => plainToInstance(this.classType, data)));
  }
}