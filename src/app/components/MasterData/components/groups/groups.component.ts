import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { activeStatus } from '../..//master-common';
import { GlobalModule } from 'src/app/shared/global.module';
import { GroupsService } from '../../service/Groups/groups.service';

export interface Element {
  name: string;
  createdDate: string;
  modifiedDate: string;
  active: boolean;
}
const Group_DATA: any[] = [];

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groupForm: any;
  displayedColumns: string[] = ['name', 'tag', 'createdDate', 'modifiedDate', 'active', 'action'];
  dataSource: any = Group_DATA;
  searchValue: any = "";
  userGroupTags: any;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectedItemForUpdate: any;
  displayGroupTable: boolean = true;
  saveBtn_disabled: boolean = false;
  actionType: any = "";
  activeStatusCode: any = activeStatus;

  constructor(
    private global: GlobalModule,
    private groupService: GroupsService) { }

  ngOnInit(): void {

    this.groupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      tagId: new FormControl('', [Validators.required]),
      active: new FormControl(false, [])
    });

    this.getAllGroups();
  }


  getAllGroups() {
    forkJoin([
      this.groupService.getGroupTags(true),
      this.groupService.getAllGroup()
    ]).subscribe((res: any) => {
      if (res[0].statusCode == 200 && res[0].data) {
        this.userGroupTags = res[0].data.map((r:any) => {
          return {
            id: r.id,
            name: r.name
          }
        });
      }
      if (res[1].statusCode == 200) {
        this.searchValue = "";
        this.setDateObj(res[1].data);
        this.dataSource = new MatTableDataSource(res[1].data);
      }
    })
  }

  //popUp Dialog
  addEdit(item:any, action:any) {
    this.displayGroupTable = false;
    this.actionType = action;
    if (this.actionType == "Add") {
      this.groupForm.reset()
    } else if (this.actionType === "Update" && item) {
      let setStatusValue = item.status == 1 ? true : false;
      this.groupForm.controls.active.setValue(setStatusValue);
      this.groupForm.patchValue(item);
      this.selectedItemForUpdate = item;
    }
  }

  saveUpdateGroupData() {
    var formData = this.groupForm.getRawValue();
    if (this.actionType === "Add") {
      if (this.groupForm.valid) {
        this.addNewGroup(formData);
      } else {
        this.global.showError('Please fill all fields');
      }

    } else if (this.actionType === "Update") {
      if (this.groupForm.valid) {
        this.updateGroupData(formData);
      } else {
        this.global.showError('Please fill all fields');
      }
    }
  }

  addNewGroup(newGroupData:any) {
    let setStatusValue = newGroupData.active == true ? this.activeStatusCode.active : this.activeStatusCode.inActive;
    let payload: any = {
      "name": newGroupData.name,
      "status": setStatusValue,
      "tagId": newGroupData.tagId

    }

    this.groupService.addGroup(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.global.showSuccess("New Group Added Successfully");
      }
    });

    this.discard();
  }

  deleteGroup(selectedGroupData:any) {
    //  this.groupService.deleteGroup(selectedGroupData).subscribe((res: any) => {
    //   if (res.statusCode == 200) {
    //     this.global.showSuccess("Group Deleted Successfully");
    //   }
    // })
  }


  updateGroupData(existingGroupData:any) {
    // this.selectedItemForUpdate = this.selectedItemForUpdate.map(r => {
    //   r['name'] = existingGroupData.name;
    //   r["GroupName"] = existingGroupData.GroupName;
    //   return r;
    // });
    let setStatusValue = existingGroupData.active == true ? this.activeStatusCode.active : this.activeStatusCode.inActive;
    this.selectedItemForUpdate['name'] = existingGroupData.name;
    this.selectedItemForUpdate["status"] = setStatusValue;
    this.selectedItemForUpdate["tagId"] = existingGroupData.tagId;

    this.groupService.updateGroup(this.selectedItemForUpdate).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.global.showSuccess("Group Data Updated Successfully");
      }
    });

    this.discard();
  }


  discard() {
    this.displayGroupTable = true;
  }

  checkValidations() {
    let objKeys = Object.keys(this.groupForm.controls);
    let formControls = this.groupForm.controls;
    for (var i = 0; i < objKeys.length; i++) {
      if (formControls[objKeys[i]].status === "INVALID") {
      }
    }
  }

  setDateObj(res:any) {
    for (var i = 0; i < res.length; i++) {
      res[i].createdDate = this.formateDate(res[i].createdDate);
      res[i].lastModifiedDate = this.formateDate(res[i].lastModifiedDate);
      let tag = this.userGroupTags.find((r:any) => r.id == res[i].tagId)
      res[i]["tag"] = tag ? tag.name : 'Custom'
    }
  }

  formateDate(dateValue:any) {
    var d = new Date(dateValue);
    var n = d.toDateString();
    var t = d.toLocaleTimeString();
    return n + " " + t;
  }


}
