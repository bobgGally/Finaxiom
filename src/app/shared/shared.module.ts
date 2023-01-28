import { SharedService } from 'src/app/shared/shared.service';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { Itr1Component } from '../components/module/itr1/itr1.component';
import { GlobalModule } from './global.module';
import { AuthInterceptorService } from './httphelper/auth-interceptor.service';
import { ApplicationHttpClient, applicationHttpClientCreator } from './httphelper/httphelper.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavigationGuard } from '../routing/navigation-guard.module';
import { MatMenuModule } from '@angular/material/menu';

export const DD_MM_YYYY_Format = {
  parse: {
    dateInput: ['DD-MM-YYYY', 'DD-MMM-YYYY'],
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


const shared = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatStepperModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  FlexLayoutModule,
  MatTabsModule,
  MatSnackBarModule,
  HttpClientModule,
  MatMenuModule
]

@NgModule({
  declarations: [
    Itr1Component,
    DashboardComponent
  ],
  imports: shared,
  exports: [
    shared,
  ],
  providers: [
    SharedService,
    CookieService,
    DatePipe,
    CurrencyPipe,
    NavigationGuard,
    {
      provide: ApplicationHttpClient,
      useFactory: applicationHttpClientCreator,
      deps: [HttpClient, GlobalModule]
    },
    // {provide: MAT_DATE_LOCALE, useValue: 'en-IN'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true, autoFocus: false, hasBackdrop: true } },
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: {
        position: 'right'
      }
    },

    // { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ]
})
export class SharedModule { }
