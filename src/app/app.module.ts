import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ArchiveModule } from './archive/archive.module';
import { ReportsModule } from './reports/reports.module';
import {NgxSpinnerModule} from 'ngx-spinner'; 
import {HttpClientModule} from '@angular/common/http';
import {Location, LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    ArchiveModule,
    ReportsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
   providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
