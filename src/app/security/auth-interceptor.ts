import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {jwtConfig} from "./auth.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Check if the request is for the authentication endpoints
    if (
      req.url.includes('/api/auth/register') ||
      req.url.includes('/api/auth/authenticate') ||
      req.url.includes('/api/application-service/all')
    ) {
      // If it is, simply pass the request to the next interceptor or HTTP handler without modification
      //console.log("interceptor1: ", req);
      return next.handle(req);
    }

    // Get the JWT token from the AuthService
    const authToken = jwtConfig.tokenGetter();

    // Clone the request and add the Authorization header with the token
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    //console.log("interceptor2: ", authReq.headers.get("Authorization"));

    // Pass the new request to the next interceptor or to the HTTP handler
    return next.handle(authReq);
  }
}
