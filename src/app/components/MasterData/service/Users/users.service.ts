import { HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as lodsh from 'lodash';
import { map } from 'rxjs/operators';
import { EndPoints } from 'src/app/shared/EndPoints';
import { GlobalModule } from 'src/app/shared/global.module';
import { ApplicationHttpClient } from 'src/app/shared/httphelper/httphelper.service';

const requestDataUser = {
  "userName": "",
  "name": "",
  "email": "",
  "password": "",
  "mappedRoleIds": [],
  "mappedGroupIds": [],
  "createdDate": null,
  "createdBy": null,
  "status": 0,
  "lastModifiedDate": null,
  "lastModifiedBy": null
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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
  addUser(data:any) {
    var dt = lodsh.merge(requestDataUser, data);
    return this.http.post(EndPoints.Users.addUser, JSON.stringify(dt), this.requestOptions).pipe(map(res => res));
  }

  updateUser(data:any) {
    return this.http.post(EndPoints.Users.updateUser, JSON.stringify(data), this.requestOptions).pipe(map(res => res));
  }

  // exportAllUser() {
  //   return this.http.get( EndPoints.Users.exportUser,this.requestOptions).pipe(map(res => res));
  // }

  exportAllUser() {
    return this.global.serviceURL + EndPoints.Users.exportUser;
  }

  getUserById(id:any) {
    return this.http.get(EndPoints.Users.getUserById + id, this.requestOptions).pipe(map(res => res));
  }
  
  userAdvancedSearch(data:any) {
    return this.http.post(EndPoints.Users.userAdvancedSearch ,data, this.requestOptions).pipe(map(res => res));
  }

  userAdvancedExport(data:any){
    // return this.http.post(EndPoints.Users.userAdvancedExport ,data, this.requestOptions).pipe(map(res => res));
    return this.http.post(EndPoints.Users.userAdvancedExport, data, { responseType: 'blob' })
  }

  searchUser(param:any) {
    return this.http.post(EndPoints.Users.searchUser + encodeURI(param), '', this.requestOptions).pipe(map(res => res));
  }

  getAllUser() {
    return this.http.get(EndPoints.Users.getAllUser, this.requestOptions).pipe(map(res => res));
  }
  
  getUsersByBehaviors(data:any) {

    return this.http.post(EndPoints.Users.getUsersByBehaviors, data, this.requestOptions).pipe(map(res => res));
  }

  getTaskAssignedDetails(wfid:any, taskid:any) {
    return this.http.get(EndPoints.Users.getTaskAssignedDetails + `${wfid}/${taskid}`, this.requestOptions).pipe(map(res => res));
  }

  getUserRoles(){
    return this.http.get(EndPoints.Users.getUserRoles + this.global.userDetails.id, this.requestOptions).pipe(map(res => res));
  }
}
