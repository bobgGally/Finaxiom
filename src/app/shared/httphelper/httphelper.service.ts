import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalModule } from '../global.module';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
  body?: any;
}

export function applicationHttpClientCreator(http: HttpClient, globals: GlobalModule) {
  return new ApplicationHttpClient(http, globals);
}

@Injectable()
export class ApplicationHttpClient {

  // Extending the HttpClient through the Angular DI.
  public constructor(public http: HttpClient, public globals: GlobalModule) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public get<T>(url: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(url, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public post<T>(url: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(url, params, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public put<T>(url: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(url, params, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public delete<T>(url: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(url, options);
  }


  getBearer(options:any) {
    return options.headers.set("Authorization", 'Bearer ' + this.globals.accessToken);
  }
}