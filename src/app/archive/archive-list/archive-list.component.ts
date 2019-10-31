import { Component, OnInit } from '@angular/core';
import {ApiHandlerService} from '../../common/api-handler.service';
@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css']
})
export class ArchiveListComponent implements OnInit {
  baseUrl: string
  recentLogs: any[]
  isLogAvailable:boolean
  constructor(private http:ApiHandlerService) { }

  ngOnInit() {
    this.isLogAvailable=false;
    this.baseUrl=this.http.getBaseURL();
    this.GetRecentLogs()
  }
  
  GetRecentLogs(){
    this.http.getAll('reports/recent').subscribe(data=>{
        if(data.status_code=='200'){
          this.isLogAvailable=true;
          this.recentLogs=data.logs;
        }
        else{
          this.isLogAvailable=false;
          this.recentLogs=[];
        }
      });
    }
}
