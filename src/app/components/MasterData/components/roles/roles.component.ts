import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { activeStatus } from '../../master-common';
import { GlobalModule } from 'src/app/shared/global.module';
import { RolesService } from '../../service/Roles/roles.service';


export interface Element {
  name: string;
  createdDate: string;
  modifiedDate: string;
  active: boolean;
}
const Role_DATA: any[] = [];

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  roleForm: any;
  displayedColumns: string[] = ['name', 'createdDate', 'modifiedDate', 'active', 'action'];
  dataSource: any;
  searchValue: any = "";
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectedItemForUpdate: any;
  displayRoleTable: boolean = true;
  saveBtn_disabled: boolean = false;
  actionType: any = "";
  siteMapData: any = [];
  siteMapSelectedId: any = [];
  sitemap: any = [];
  activeStatusCode: any = activeStatus;

  constructor(
    private global: GlobalModule,
    private roleService: RolesService) { }

  ngOnInit(): void {
    this.roleForm = new FormGroup({
      //name: new FormControl('', [Validators.required, Validators.pattern(/[^-\s]/m)]),
      name: new FormControl('', [Validators.required]),
      siteMap: new FormControl('', []),
      active: new FormControl(false, []),
    });

    this.getAllRoles();
    this.getSiteMapData();
  }


  getAllRoles() {
    this.roleService.getAllRole().subscribe((res: any) => {
      if (res.statusCode == 200) {
        // this.dataSource =  res.data;
        this.searchValue = "";
        this.setDateObj(res.data);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.paginator.firstPage()
      }
    })
  }

  //popUp Dialog
  addEdit(item:any, action:any) {
    this.displayRoleTable = false;
    this.actionType = action;
    if (this.actionType == "Add") {
      this.sitemap = [];
      this.roleForm.reset();

    } else if (this.actionType === "Update" && item) {
      this.getRoleDataById(item.id);
      //this.getSiteMapDataByRoleId(item.id);

    }
  }

  saveUpdateRoleData() {
    var formData = this.roleForm.getRawValue();
    if (this.actionType === "Add") {
      if (this.roleForm.valid) {
        this.addNewRole(formData);
      } else {
        this.global.showError('Please fill all fields');
      }

    } else if (this.actionType === "Update") {
      if (this.roleForm.valid) {
        this.updateRoleData(formData);
      } else {
        this.global.showError('Please fill all fields');
      }
    }
  }

  addNewRole(newRoleData:any) {
    let setStatusValue = newRoleData.active == true ? this.activeStatusCode.active : this.activeStatusCode.inActive;
    this.getSiteMapIds(newRoleData);

    let payload: any = {
      "name": newRoleData.name,
      "mappedSiteMapIds": this.siteMapSelectedId,
      "status": newRoleData.active
    }

    this.roleService.addRole(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.global.showSuccess("New Role Added Successfully");
      }
    })

    this.discard();
  }


  getSiteMapIds(newRoleData:any) {
    if (newRoleData.siteMap != null) {
      this.siteMapSelectedId = newRoleData.siteMap.map((r:any) => {
        return r.id;
      })
    } else {
      this.siteMapSelectedId = [];
    }
  }

  deleteRole(selectedRoleData:any) {
    //  this.roleService.deleteRole(selectedRoleData).subscribe((res: any) => {
    //   if (res.statusCode == 200) {
    //     this.global.showSuccess("Role Deleted Successfully");
    //   }
    // })
  }


  updateRoleData(existingRoleData:any) {
    // this.selectedItemForUpdate = this.selectedItemForUpdate.map(r => {
    //   r['name'] = existingRoleData.name;
    //   r["RoleName"] = existingRoleData.RoleName;
    //   return r;
    // });

    let setStatusValue = existingRoleData.active == true ? this.activeStatusCode.active : this.activeStatusCode.inActive;
    this.getSiteMapIds(existingRoleData);

    this.selectedItemForUpdate['name'] = existingRoleData.name;
    this.selectedItemForUpdate['mappedSiteMapIds'] = this.siteMapSelectedId;
    this.selectedItemForUpdate['status'] = setStatusValue;

    this.roleService.updateRole(this.selectedItemForUpdate).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.global.showSuccess("Role Data Updated Successfully");
      }
    });

    this.discard();
  }


  discard() {
    this.displayRoleTable = true;
  }

  checkValidations() {
    let objKeys = Object.keys(this.roleForm.controls);
    let formControls = this.roleForm.controls;
    for (var i = 0; i < objKeys.length; i++) {
      if (formControls[objKeys[i]].status === "INVALID") {
      }
    }
  }

  getSiteMapData() {
    this.roleService.getAllSiteMap().subscribe((res: any) => {
      if (res.statusCode == 200 && res.data) {
        this.siteMapData = res.data.sort(function (a:any, b:any) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });;
      } else {
        this.siteMapData = []
      }
    });
  }

  getRoleDataById(roleid:any) {
    this.roleService.getRoleById(roleid).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.roleForm.reset();
        let getStatusValue = res.data.status == 1 ? true : false;
        this.roleForm.controls.active.setValue(getStatusValue);
        this.roleForm.controls.name.setValue(res.data.name);
        this.selectedItemForUpdate = res.data;
        this.setSiteMapDataById(res.data.mappedSiteMapIds);
        //this.roleForm.patchValue(item);
      }
    });
  }


  setSiteMapDataById(data:any) {
    try {
      let sitMapObj = [];
      for (var i = 0; i < this.siteMapData.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (data[j] == this.siteMapData[i].id) {
            sitMapObj.push(this.siteMapData[i]);
          }
        }
      }
      this.sitemap = sitMapObj;
      this.roleForm.controls.siteMap.setValue(sitMapObj);
    } catch (e) {
    }

  }

  setDateObj(res:any) {
    for (var i = 0; i < res.length; i++) {
      res[i].createdDate = this.formateDate(res[i].createdDate);
      res[i].lastModifiedDate = this.formateDate(res[i].lastModifiedDate);
    }
  }

  formateDate(dateValue:any) {
    var d = new Date(dateValue);
    var n = d.toDateString();
    var t = d.toLocaleTimeString();
    return n + " " + t;
  }

}
