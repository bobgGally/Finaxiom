import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as lodsh from 'lodash';
import { map } from 'rxjs/operators';
import { EndPoints } from 'src/app/shared/EndPoints';
import { GlobalModule } from 'src/app/shared/global.module';
import { ApplicationHttpClient } from 'src/app/shared/httphelper/httphelper.service';

const requestDataSiteMap = {
  "name": "",
  "displayName": "",
  "pagePath": "",
  "iconClass": "",
  "displayOrder": "",
  "platform": "",
  "createdDate": null,
  "createdBy": null,
  "status": 1,
  "lastModifiedDate": null,
  "lastModifiedBy": null
}

const requestDataRole = {
  "name": "",
  "mappedSiteMapIds": [],
  "createdDate": null,
  "createdBy": null,
  "status": 1,
  "lastModifiedDate": null,
  "lastModifiedBy": null
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  requestOptions: {
    headers: any
  } = {
      headers: ''
    }

  constructor(private http: ApplicationHttpClient, private global: GlobalModule) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.requestOptions.headers = headers;
  }

  addRole(data:any) {
    var dt = lodsh.merge(requestDataRole, data);
    return this.http.post( EndPoints.Role.addRole, JSON.stringify(dt), this.requestOptions).pipe(map(res => res));
  }

  updateRole(data:any) {
    return this.http.post( EndPoints.Role.updateRole, JSON.stringify(data), this.requestOptions).pipe(map(res => res));
  }

  getAllRole() {
    return this.http.get( EndPoints.Role.getRoleAll, this.requestOptions).pipe(map(res => res));
  }

  getRoleById(id:any) {
    return this.http.get( EndPoints.Role.getRoleById + id, this.requestOptions).pipe(map(res => res));
  }

  getAllSiteMap() {
    return this.http.get( EndPoints.SiteMap.getAllSiteMaps, this.requestOptions).pipe(map(res => res));
  }

  getAllSiteMapById(roleId:any) {
    return this.http.get( EndPoints.SiteMap.getSiteMapByRole + roleId, this.requestOptions).pipe(map(res => res));
  }
}
