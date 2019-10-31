import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchiveAddComponent } from './archive-add/archive-add.component';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { LayoutModule } from '../layout/layout.module';
import { FaqComponent } from './faq/faq.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchiveFileUploadComponent } from './archive-file-upload/archive-file-upload.component';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    ArchiveRoutingModule
    
  ],
  declarations: [ArchiveAddComponent, ArchiveListComponent, FaqComponent, ArchiveFileUploadComponent]
})
export class ArchiveModule { }
