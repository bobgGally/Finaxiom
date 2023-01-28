import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as lodsh from 'lodash';
import { map } from 'rxjs/operators';
import { EndPoints } from 'src/app/shared/EndPoints';
import { GlobalModule } from 'src/app/shared/global.module';
import { ApplicationHttpClient } from 'src/app/shared/httphelper/httphelper.service';

const requestDataGroup = {
  "name": "",
  "createdDate": null,
  "createdBy": null,
  "status": 1,
  "lastModifiedDate": null,
  "lastModifiedBy": null
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

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

  addGroup(data:any) {
    var dt = lodsh.merge(requestDataGroup, data);
    return this.http.post(EndPoints.Group.addGroup, JSON.stringify(dt), this.requestOptions).pipe(map(res => res));
  }

  updateGroup(data:any) {
    return this.http.post(EndPoints.Group.updateGroup, JSON.stringify(data), this.requestOptions).pipe(map(res => res));
  }

  getAllGroup() {
    return this.http.get(EndPoints.Group.getGroupAll, this.requestOptions).pipe(map(res => res));
  }

  getGroupTags(isActive = false) {
    return this.http.get(EndPoints.Group.getGroupTags + isActive, this.requestOptions).pipe(map(res => res));
  }


  getGroupById(id:any) {
    return this.http.get(EndPoints.Group.getGroupById + id, this.requestOptions).pipe(map(res => res));
  }
}
