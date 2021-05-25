import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenService} from '../services/token.service';
import {NotificationService} from '../services/notification.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService, private notificationService: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.tokenService.logOut();
        window.location.reload();
      }

      const errorMessage = err.error.message || err.statusText;
      this.notificationService.showSnackBar(errorMessage);

      return throwError(errorMessage);
    }));
  }
}

export const authErrorInterceptorProvider = [
  {provide: HTTP_INTERCEPTORS, userClass: ErrorInterceptorService, multi: true}
];
