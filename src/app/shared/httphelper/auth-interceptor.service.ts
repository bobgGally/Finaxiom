import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { GlobalModule } from '../global.module';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  service_count = 0;
  constructor(private shared: SharedService, private global: GlobalModule) { }
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service_count++;
    this.showLoader();
    // if (req.method === 'GET') {
    const customRequest = req.clone({
      url: this.global.serviceURL + req.url,
      headers: req.headers.set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
    });
    return next.handle(customRequest).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.body.statusCode && event.body.statusCode != 200)
          event?.body?.message && this.global.showError(event.body.message)
        this.service_count--;
      }
    },
      (err: any) => {
        this.service_count--;
        this.global.showError("Please try again later");
      }), finalize(() => {
        if (this.service_count === 0) {
          this.hideLoader();
        }
      }));
    // }
    // return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {
    //     this.service_count--;
    //   }
    // },
    //   (err: any) => {
    //     this.service_count--;
    //     this.global.showError(err.error || err.statusText || "Please try again later");
    //   }), finalize(() => {
    //     if (this.service_count === 0) {
    //       this.hideLoader();
    //     }
    //   }));
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    this.shared.showSpinner(this.global.loaderName)
  }
  private hideLoader(): void {
    this.shared.hideSpinner(this.global.loaderName)
    //hide the image
  }
}
