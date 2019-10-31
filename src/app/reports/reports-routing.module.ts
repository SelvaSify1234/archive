import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDonwloadComponent } from './report-donwload/report-donwload.component';

const routes: Routes = [
  {path:'reports',component:LayoutComponent,
    children:[
      {path:'',component:ReportListComponent},
      {path:'download',component:ReportDonwloadComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
