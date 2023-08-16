import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {jwtConfig} from "./auth.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url.includes('/api/auth/register') ||
      req.url.includes('/api/auth/authenticate') ||
      req.url.includes('/api/application-service/all')
    ) {
      return next.handle(req);
    }

    const authToken = jwtConfig.tokenGetter();

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });


    return next.handle(authReq);
  }
}
