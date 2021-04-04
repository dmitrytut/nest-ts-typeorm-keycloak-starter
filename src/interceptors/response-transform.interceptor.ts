import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Server response format.
 */
export interface IResponse<T> {
    data: T;
}

/**
 * Interceptor for transforming server response.
 */
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
        return next.handle().pipe(map((data) => ({ data })));
    }
}
