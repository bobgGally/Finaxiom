import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Observable } from 'rxjs';
import { GlobalModule } from 'src/app/shared/global.module';
import { GroupsService } from '../../service/Groups/groups.service';
import { RolesService } from '../../service/Roles/roles.service';
import { UsersService } from '../../service/Users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { NIL as uuid } from 'uuid';
import { activeStatus } from '../../master-common';

export interface Element {
  name: string;
  userName: string;
  email: string;
  active: boolean;
}
const User_DATA: any[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //#region variable
  @ViewChild('userPaginator')
  paginator!: MatPaginator;

  groupForm: FormGroup = new FormGroup({});
  usercolumns = [
    { width: '33', columnDef: 'name', header: 'Name', cell: (element: any,i:any) => element.name },
    { width: '33', columnDef: 'userName', header: 'Username', cell: (element: any,i:any) => element.userName },
    { width: '33', columnDef: 'email', header: 'Email', cell: (element: any,i:any) => element.email },
    { width: '50px', columnDef: 'active', header: 'Active?', cell: (element: any,i:any) => element.status },
    { width: '50px', columnDef: 'action', header: 'Action', cell: (element: any,i:any) => element.custom },
  ]
  userDisplayedColumns = this.usercolumns.map(c => c.columnDef);
  dataSource: any = User_DATA;
  searchValue: any = "";
  roleGroupdataSource: any = new MatTableDataSource([{
    role: '',
    country: [],
    bu: [],
    sbu: [],
    custom: []
  }])
  roleGroupcolumns = [
    { width: '30px', columnDef: 'select', header: 'Role', cell: (element: any, i: any) => element },
    { width: '20', columnDef: 'role', header: 'Role', cell: (element: any, i: any) => element.role },
    { width: '20', columnDef: 'country', header: 'Country', cell: (element: any, i: any) => element.country },
    { width: '20', columnDef: 'bu', header: 'BU', cell: (element: any, i: any) => element.bu },
    { width: '20', columnDef: 'sbu', header: 'SBU', cell: (element: any, i: any) => element.sbu },
    { width: '20', columnDef: 'custom', header: 'Custom', cell: (element: any, i: any) => element.custom },
  ]
  roleGroupDisplayedColumns = this.roleGroupcolumns.map(c => c.columnDef);

  escalationdataSource: any = new MatTableDataSource([])

  escalationcolumns = [
    // { width: '30px', columnDef: 'select', header: 'Role', cell: (element: any) => element },
    { width: '25', columnDef: 'role', header: 'Role', cell: (element: any) => element.role },
    { width: '25', columnDef: 'country', header: 'Country', cell: (element: any) => element.country },
    { width: '25', columnDef: 'bu', header: 'BU', cell: (element: any) => element.bu },
    // { width: '20', columnDef: 'sbu', header: 'SBU', cell: (element: any) => element.sbu },
    { width: '25', columnDef: 'custom', header: 'Custom', cell: (element: any) => element.custom },
    { width: '50px', columnDef: 'action', header: 'Action', cell: (element: any) => element.custom },
  ]
  escalationDisplayedColumns = this.escalationcolumns.map(c => c.columnDef);
  isAdvancedSearch = true;
  selectedBU = new FormControl('');
  selectedSBU = new FormControl('');
  selectedRole = new FormControl('');
  selectedCountry = new FormControl('');
  selection = new SelectionModel<any>(true, []);
  selectedItemForUpdate: any;
  displayUserTable: boolean = true;
  saveBtn_disabled: boolean = false;
  actionType: any = "";
  userRoles: any = [];
  userGroup: any = [];
  userCountry: any = [];
  userBU: any = [];
  userSBU: any = [];
  userCustom: any = [];
  userCustomEscalation: any = [];
  userGroupTags: any = [];
  groupSelectedIds: any = [];
  roleSelectedIds: any = [];
  activeStatusCode: any = activeStatus;
  masterSBU: any;
  Role: any;
  Country: any;
  businessList: any[] = new Array()
  subbusinessList: any[] = new Array()
  countryList: string[] = [];
  currentData: any = null;
  isNew: any;
  today: any;
  filterForm: any = {
    role: '',
    country: [],
    bu: [],
    sbu: []
  }

  //#endregion
  constructor(private global: GlobalModule,
    private userService: UsersService,
    private groupService: GroupsService,
    private roleService: RolesService,
  ) { }
  ngOnInit(): void {
    this.groupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      //password: new FormControl('',[Validators.required]),
      active: new FormControl(false),
    });
    this.getRoles();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getAllUsers();
  }

  //#region on add or edit click

  addEdit(item: any, action: any) {
    this.displayUserTable = false;
    this.actionType = action;
    this.groupForm.reset();
    if (this.actionType == "Add") {
      this.setDefaultRoles();
    } else if (this.actionType === "Update" && item) {
      this.getUserById(item.id);
    }
  }

  getUserById(userId: any) {
    this.selection.clear()
    this.userService.getUserById(userId).subscribe((res: any) => {
      if (res.statusCode == 200 && res.data) {
        let getStatusValue = res.data.status == 1 ? true : false;
        this.groupForm.controls['active'].setValue(getStatusValue);
        this.groupForm.patchValue(res.data);
        this.selectedItemForUpdate = res.data;
        if (res.data.userRoleGroups.length && res.data.userRoleGroups.length > 0) {

          var temp = this.userRoles.map((r: any) => {
            let role = res.data.userRoleGroups.find((rg: any) => r.id == rg.role.id)
            let country = [], bu = [], custom = [], sbu = []
            if (role && role.groups && role.groups.length > 0) {
              country = role.groups.map((g: any) => {
                var group = this.userCountry.find((e: any) => e.id == g.id)
                return group
              }).filter((e: any) => e)
              bu = role.groups.map((g: any) => {
                var group = this.userBU.find((e: any) => e.id == g.id)
                return group
              }).filter((e: any) => e)
              sbu = role.groups.map((g: any) => {
                var group = this.userSBU.find((e: any) => e.id == g.id)
                return group
              }).filter((e: any) => e)
              custom = role.groups.map((g: any) => {
                var group = this.userCustom.find((e: any) => e.id == g.id)
                return group
              }).filter((e: any) => e)

            }
            let t = {
              role: r,
              country: country || [],
              bu: bu || [],
              sbu: sbu || [],
              custom: custom || []
            }
            if (role)
              this.selection.select(t)
            return t;
          })

          this.roleGroupdataSource = new MatTableDataSource(temp)
        } else
          this.setDefaultRoles()
      }
    })
  }

  setDefaultRoles() {

    this.selection.clear()
    var temp = this.userRoles.map((r: any) => {
      let t = {
        role: r,
        country: [],
        bu: [],
        sbu: [],
        custom: []
      }
      return t;
    })

    this.roleGroupdataSource = new MatTableDataSource(temp)
  }

  onTabChange(e: any) {
    console.log(e);
    // if (e.index == 1 && this.actionType === 'Update') {
    //   this.getEscalationByUserId(this.selectedItemForUpdate.id)
    // }

  }

  //#endregion

  //#region onSave Add or update user
  checkRoleGroupValid() {
    var data = this.selection.selected
    var result = false;
    if (data.length > 0) {
      var emptyroles = data.filter(r => r.role == '')
      // var emptyGroup = data.filter(r => r.groups.length == 0)
      if (emptyroles.length > 0) {
        this.global.showError("Please select a role")
        result = false
      }
      else if (data.length > 1) {
        var valueArr = data.map(function (item) { return item.role });
        var isDuplicate = valueArr.some(function (item, idx) {
          return valueArr.indexOf(item) != idx
        });
        if (isDuplicate) {
          this.global.showError("Duplicate role is selected. Please ")
          result = false
        } else {
          result = true
        }
      }
      // else if (emptyGroup.length > 0) {
      //   this.global.showError("Please select a group")
      //   result = false
      // } 
      else {
        result = true
      }
    } else {
      this.global.showError("Please add atleast one role ")
      result = false
    }
    return result;
  }

  saveUpdateUserData() {
    var formData = this.groupForm.getRawValue();

    if (this.groupForm.valid) {
      if (this.checkRoleGroupValid()) {
        this.actionType === "Add" && this.addNewUser(formData);
        this.actionType === "Update" && this.updateUserData(formData);
      }
    } else {
      this.setValidationsMsg();
    }

  }

  addNewUser(newUserData: any) {
    let setStatusValue = newUserData.active == true ? this.activeStatusCode.active : this.activeStatusCode.inActive;
    this.getIdsRoleAndGroup(newUserData);

    let payload: any = {
      "userName": newUserData.userName,
      "name": newUserData.name,
      "email": newUserData.email,
      "password": 'password',
      "userRoleGroups": this.global.cloneData(this.selection.selected).map((r: any) => {

        r["groups"] = [...r.country, ...r.bu, ...r.sbu, ...r.custom]
        delete r.country
        delete r.bu
        delete r.sbu
        delete r.custom
        return r
      }),
      "status": setStatusValue
    }

    this.userService.addUser(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.global.showSuccess("New User Added Successfully");
        this.getAllUsers();
        this.discard();

      }

    })


  }

  updateUserData(existingUserData: any) {
    let setStatusValue = existingUserData.active == true ? this.activeStatusCode.active : this.activeStatusCode.inActive;

    this.selectedItemForUpdate['name'] = existingUserData.name;
    this.selectedItemForUpdate["userName"] = existingUserData.userName;
    this.selectedItemForUpdate["email"] = existingUserData.email;
    this.selectedItemForUpdate["userRoleGroups"] = this.global.cloneData(this.selection.selected).map((r: any) => {
      r["groups"] = [...r.country, ...r.bu, ...r.sbu, ...r.custom]
      delete r.country
      delete r.bu
      delete r.sbu
      delete r.custom
      return r
    });
    this.selectedItemForUpdate["status"] = setStatusValue;

    this.userService.updateUser(this.selectedItemForUpdate).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.global.showSuccess("User Data Updated Successfully");
        this.getAllUsers();
        this.discard();

      }

    });

  }

  getIdsRoleAndGroup(newUserData: any) {
    if (newUserData.group != null) {
      this.groupSelectedIds = newUserData.group.map((r: any) => {
        return r.id;
      })
    } else {
      this.groupSelectedIds = [];
    }

    if (newUserData.role != null) {
      this.roleSelectedIds = newUserData.role.map((r: any) => {
        return r.id;
      })
    } else {
      this.roleSelectedIds = [];
    }
  }

  setValidationsMsg() {
    let invalidObj = [];
    let objKeys = Object.keys(this.groupForm.controls);
    let formControls = this.groupForm.controls;
    for (var i = 0; i < objKeys.length; i++) {
      if (formControls[objKeys[i]].status === "INVALID") {
        invalidObj.push(objKeys[i]);
      }
    }

    if (invalidObj.length != 0 && invalidObj.length > 1) {
      this.global.showError('Please fill all fields');
    } else if (invalidObj.length == 1 && invalidObj[0] == "email") {
      this.global.showError('Please enter valid email');
    } else {
      this.global.showError('Please fill all fields');
    }

  }

  //#endregion

  //#region master

  getAllUsers() {
    this.userService.getAllUser().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.searchValue = "";
        this.dataSource = new MatTableDataSource(res.data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.paginator.firstPage();
        }, 400);

        //this.dataSource.filterPredicate = (data: Element, filter: string) => data.name.indexOf(filter) != -1;
      }
    })
  }

  getRoles() {
    this.roleService.getAllRole().subscribe((res: any) => {
      if (res.statusCode == 200 && res.data) {
        this.userRoles = res.data.map((r: any) => {
          return {
            id: r.id,
            name: r.name
          }
        });
      }
    });
  }

  //#endregion

  //#region other functionality

  discard() {
    this.displayUserTable = true;
    this.selection.clear()
    this.roleGroupdataSource = new MatTableDataSource([{
      role: '',
      country: [],
      bu: [],
      sbu: [],
      custom: []
    }])
    this.escalationdataSource = new MatTableDataSource([])
  }

  exportUsers() {
    window.open(this.userService.exportAllUser());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //#endregion


  //#region select checkbox toggle rolegroup
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.roleGroupdataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.roleGroupdataSource.data.forEach((row: any) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  //#endregion

  //#region Advance Search and Export
  searchUsersAdvanced() {
    var buid = this.filterForm.bu.length > 0 ? this.filterForm.bu.map((r: any) => r.id) : []
    var data = {

      roleId: this.filterForm.role == "" ? null : this.filterForm.role,
      groupId: [...this.filterForm.country, ...buid, ...this.filterForm.sbu]
    }

    this.userService.userAdvancedSearch(data).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.searchValue = "";
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.paginator.firstPage()
      }
    })
  }

  exportUsersAdvanced() {
    var buid = this.filterForm.bu.length > 0 ? this.filterForm.bu.map((r: any) => r.id) : []
    var data = {

      roleId: this.filterForm.role == "" ? null : this.filterForm.role,
      groupId: [...this.filterForm.country, ...buid, ...this.filterForm.sbu]
    }
    if (data.roleId == null && data.groupId.length == 0)
      this.global['loaderName'] = 'userExport'
    else
      this.global['loaderName'] = null
    this.userService.userAdvancedExport(data).subscribe((res: any) => {
      // this.shared.downloadFile(res, 'NPI_Users_Export', '.xlsx')
      setTimeout(() => {
        this.global.loaderName = null
      }, 100);
    })
  }

  resetFilter() {
    this.filterForm = {
      role: '',
      country: [],
      bu: [],
      sbu: []
    }

    this.getAllUsers();
  }
  //#endregion
}

