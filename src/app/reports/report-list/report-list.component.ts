import { Component, OnInit } from '@angular/core';
import {ApiHandlerService} from '../../common/api-handler.service';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  logs: any[]
  isLogAvailable:boolean
  baseUrl: string
  constructor(private http:ApiHandlerService) { }

  ngOnInit() {
    this.isLogAvailable=false
    this.baseUrl=this.http.getBaseURL();
    this.GetLogs()
  }

  GetLogs(){
    this.http.getAll('reports/all').subscribe(data=>{
      if(data.status_code=='200'){
        this.isLogAvailable=true;
        this.logs=data.logs;
      }
      else{
        this.isLogAvailable=false;
        this.logs=[];
      }
    });
  }

}
