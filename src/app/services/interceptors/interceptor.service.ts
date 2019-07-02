import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  accessToken: string;

  constructor() {
    this.accessToken = localStorage.getItem("access_token") || null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.accessToken && req.url.includes('do_vote')) {
      req = req.clone({
        setHeaders: {
          access_token: this.accessToken
        }
      })
    }
    return next.handle(req);
  }
}
