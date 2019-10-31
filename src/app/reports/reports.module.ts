import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDonwloadComponent } from './report-donwload/report-donwload.component';


@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
  ],
  declarations: [ReportListComponent, ReportDonwloadComponent]
})
export class ReportsModule { }
