import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { GlobalModule } from './global.module';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequestType } from './enums';
declare let message: any, launchPriorityColor: any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(
    private globals: GlobalModule,
    public router: Router,
    private dialog: MatDialog,
    public spinner: NgxSpinnerService) { }
  minWidth = 400;
  minHeight = 400;
  sidenav: any;


  public SelectModule = new BehaviorSubject<any>(1);
  public loadPath = new BehaviorSubject<any>(1);
  public printQR = new BehaviorSubject<any>('');
  public dashboardFullScreen = new BehaviorSubject<any>('');

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }


  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }

  showSpinner(name = 'primary') {
    this.spinner.show(name)
  }

  hideSpinner(name = 'primary') {
    this.spinner.hide(name)
    //hide the image
  }

  IsJsonString(str: any) {
    var final;
    try {
      final = JSON.parse(str);
    } catch (e) {
      return {};
    }
    return final;
  }

  // widthAndHeightCal(dropped) {
  //   return new Promise(resolve => {
  //     let width = 0;
  //     let height = 0;
  //     let fr = new FileReader();
  //     fr.onload = () => {
  //       resolve(true);
  //       // when file has loaded
  //       // var img = new Image();

  //       // img.onload = () => {
  //       //   width = img.width;
  //       //   height = img.height;
  //       //   if (width <= this.minWidth && height <= this.minHeight) {
  //       //     this.globals.showmessage("Uploaded Successfully!")
  //       //     resolve(true);
  //       //   }
  //       //   else {
  //       //     this.globals.showmessage("The Image dimensions should be 400*400")
  //       //     resolve(false);
  //       //   }
  //       // };
  //       // img.src = fr.result as string; // This is the data URL 

  //     };
  //     fr.readAsDataURL(dropped);
  //   })
  // }

  // navigateDefault() {
  //   this.getMenu().subscribe((r: any) => {
  //     if (r.length > 0) {
  //       this.router.navigate([r[0].pagePath])
  //     }
  //   }, error => {
  //     this.router.navigate(['/tasks'])
  //   })
  // }

  // setCustomHeader(data) {

  //   if (data) {
  //     this.globals.breadCrumbList = [];
  //     this.globals.breadCrumbList.push({ "label": `${data?.request?.requestTypeName || ''} (${data.request.parentRequestNo || data.request.requestNumber})`, "type": '' });
  //   }
  // }
  // getMenu() {
  //   return new Observable((observer) => {
  //     this.menuService.GetUserMenu().subscribe((res: any) => {
  //       if (res.statusCode == 200 && res.data) {

  //         this.globals.rawMenu = res.data
  //         this.globals.menu = res.data.sort((a, b) => {
  //           if (parseInt(a.displayOrder) < parseInt(b.displayOrder)) {
  //             return -1;
  //           }
  //         }).map(r => {
  //           r["displayCategory"] = "Landing Page";
  //           return {
  //             "order": 0,
  //             "menu": [r]
  //           }
  //         })
  //         var dummy = [
  //           // {
  //           //   "name": "Update Forecast",
  //           //   "displayName": "Update Forecast",
  //           //   "pagePath": "/updateforecast",
  //           //   "iconClass": "mytask",
  //           // },
  //           // {
  //           //   "name": "Old Users",
  //           //   "displayName": "Old Users",
  //           //   "pagePath": "/masters/oldusers",
  //           //   "iconClass": "mytask",
  //           // }
  //         ]
  //         dummy.forEach(element => {
  //           this.globals.menu.push(
  //             {
  //               "order": 0,
  //               "menu": [{
  //                 "name": element.name,
  //                 "displayName": element.displayName,
  //                 "pagePath": element.pagePath,
  //                 "iconClass": element.iconClass,
  //                 "displayOrder": "1",
  //                 "platform": "Web",
  //                 "displayCategory": "Landing Page"
  //               }]
  //             }
  //           )
  //         });


  //         observer.next(res.data)
  //       } else {
  //         observer.error()
  //       }
  //     }, error => {
  //       this.globals.rawMenu = []
  //       this.globals.menu = []
  //       observer.error()
  //     });
  //   })
  // }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^\d+$/;

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

  // validatorRequired(form: any, controlName?: any) {
  //   try {
  //     const validatorC = form.get(controlName).validator ? form.get(controlName).validator({} as AbstractControl) : null;
  //     if (validatorC && validatorC.required) {
  //       return true;
  //     } else
  //       return false
  //   } catch (error) {
  //   }
  // }

  // exportexcel(options: exportTableOption) {
  //   return new Observable(o => {
  //     var data = this.extractData(options)
  //     const headers: Array<string> = options.columns.map((c, index) => c.header).filter((a, i) => options.excludeColumns.indexOf(i) == -1);

  //     var wb = XLSX.utils.book_new();

  //     var ws = XLSX.utils.json_to_sheet(data);
  //     XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' }); //heading: array of arrays

  //     XLSX.utils.book_append_sheet(wb, ws);


  //     XLSX.writeFile(wb, options.fileName + '.xlsx')
  //     o.next()
  //   })


  // }

  // extractData(options: exportTableOption) {
  //   return options.data.map(r => {
  //     let customObj = {}
  //     options.columns.forEach((element, index) => {
  //       if (options.excludeColumns.indexOf(index) == -1)
  //         customObj[element.columnDef] = element.cell(r)
  //     });
  //     return customObj
  //   }) || []
  // }


  // downloadFile(blob, fileName, extension = '.xlsx') {
  //   var anchor = document.createElement('a');
  //   anchor.download = fileName + extension;
  //   anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
  //   anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
  //   anchor.click();
  // }

  // noWhitespaceValidator(control: FormControl) {
  //   const isWhitespace = (control.value || '').trim().length === 0;
  //   const isValid = !isWhitespace;
  //   return isValid ? null : { 'whitespace': true };
  // }


  // calculateDiff(lDate, ADate) {
  //   var launchDate = new Date(lDate)
  //   var ApprovalDate = new Date(ADate)
  //   var difference = Math.floor((Date.UTC(launchDate.getFullYear(), launchDate.getMonth(), launchDate.getDate()) - Date.UTC(ApprovalDate.getFullYear(), ApprovalDate.getMonth(), ApprovalDate.getDate())) / (1000 * 60 * 60 * 24));
  //   return difference
  // }

  // arrarDifferencebyKey(left, right, compareFunction) {
  //   return left.filter(leftValue =>
  //     !right.some(rightValue =>
  //       compareFunction(leftValue, rightValue)));
  // }



}



export interface exportTableOption {
  fileName: string;
  sheetName?: string;
  data: Array<any>;
  excludeColumns?: Array<number>;
  columns: any
}

interface menyType {
  groupTitle: string;
  order: any;
  menu: Array<any>;
}


// @Pipe({ name: 'enumToArray' })

// export class EnumToArrayPipe implements PipeTransform {
//   transform(value: Object) {
//     return Object.keys(value).filter(e => !isNaN(+e)).map(o => { return { index: +o, name: value[o] } });
//   }
// }