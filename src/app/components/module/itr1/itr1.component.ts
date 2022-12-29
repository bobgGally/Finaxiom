import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

export interface PeriodicElement {
  sourcetype: string;
  incomevalue: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-itr1',
  templateUrl: './itr1.component.html',
  styleUrls: ['./itr1.component.scss']
})
export class Itr1Component {

  itrForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  services = [{ name: 'ITR - 1', value: 'itr1' }]
  sourceTypes = [
    { name: 'Employment Income', value: 'empIncome' },
    { name: 'Divident Income', value: 'dvdIncome' },
    { name: 'Share Income', value: 'shrIncome' }
  ]

  displayedColumns: string[] = ['sourcetype', 'incomevalue'];
  dataToDisplay = [...ELEMENT_DATA];

  uploaddisplayedColumns: string[] = ['sourcetype', 'incomevalue', 'dataSourceUpload'];
  uploaddataToDisplay = [...ELEMENT_DATA];;

  dataSource = new ExampleDataSource(this.dataToDisplay);
  dataSourceUpload = new ExampleDataSource(this.uploaddataToDisplay);

  addData() {
    const randomElementIndex: PeriodicElement = {
      sourcetype: '',
      incomevalue: 0
    };
    this.dataToDisplay = [...this.dataToDisplay, randomElementIndex];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }

  // initializeUpload(fileControl, item, tableRef, i) {

  // }
}


class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}