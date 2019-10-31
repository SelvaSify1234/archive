import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiHandlerService} from '../../common/api-handler.service';
import {ViewChild,ElementRef} from '@angular/core';

@Component({
  selector: 'app-archive-file-upload',
  templateUrl: './archive-file-upload.component.html',
  styleUrls: ['./archive-file-upload.component.css']
})

export class ArchiveFileUploadComponent implements OnInit {
  @ViewChild('uploadedFile')
    myInputVariable: ElementRef;
  isDataProcessCompleted:boolean;
  errorMessage: string;
	hasError:boolean;
	successMessage: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  constructor(private http:ApiHandlerService,private spinner:NgxSpinnerService ) { }

  ngOnInit() {
  }

  selectFile(event) {
    debugger;
    this.selectedFiles = event.target.files;
  }
  upload() {
    	/** spinner starts on init */
		this.spinner.show();
    this.errorMessage='';
		this.hasError=false;
		
    this.currentFileUpload = this.selectedFiles.item(0);
    this.http.pushFileToStorage(this.currentFileUpload,'upload/config').subscribe(data => {
      this.spinner.hide();
				if(data.status_code=='200'){
          this.isDataProcessCompleted=true;
					this.successMessage=data.message;
				}
				else{
					this.hasError=true;
					this.errorMessage=data.message;
				}
    });
    this.selectedFiles = undefined;
    this.myInputVariable.nativeElement.value = "";
  }
  downloadSampleFile(){
    window.open('/assets/docs/simple_user_input.json', '_blank');
  }
}
