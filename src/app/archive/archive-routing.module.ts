import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { ArchiveAddComponent } from './archive-add/archive-add.component';
import { FaqComponent } from './faq/faq.component';
import { ArchiveFileUploadComponent } from './archive-file-upload/archive-file-upload.component';

const routes: Routes = [
  {path:'archival',component:LayoutComponent,
    children:[
        {path:'add',component:ArchiveAddComponent},
        {path:'list',component:ArchiveListComponent},
        {path:'faq',component:FaqComponent},
        {path:'config-upload',component:ArchiveFileUploadComponent},
        {path:'',redirectTo:'list',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
