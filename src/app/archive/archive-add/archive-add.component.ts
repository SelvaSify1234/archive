import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiHandlerService} from '../../common/api-handler.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-archive-add',
  templateUrl: './archive-add.component.html',
  styleUrls: ['./archive-add.component.css']
})
export class ArchiveAddComponent implements OnInit {
	serverConfigForm: FormGroup;
	errorMessage: string;
	inputData: any;
	archivalResult:any;
	isDataProcessCompleted:boolean;
	hasError:boolean;
	customer_type:any;
	successMessage: string;
	group: any;
	constructor(private fb: FormBuilder,private spinner: NgxSpinnerService,private http:ApiHandlerService) { 
			 this.group = {
			      'database_config': fb.group({
					'mysql_source_host':[null,[Validators.required]],
					'mysql_source_username':[null,[Validators.required]],
					'mysql_source_password':[null],
					'mysql_source_port':[null,[Validators.required]],
					'mysql_source_database':[null,[Validators.required]],
					'mysql_destination_host':[null,[Validators.required]],
					'mysql_destination_username':[null,[Validators.required]],
					'mysql_destination_password':[null],
					'mysql_destination_port':[null,[Validators.required]],
					'mysql_destination_database':[null,[Validators.required]],
					'mysql_select_module':[null,[Validators.required]],
					'customer_type':['1',[Validators.required]],
					'create_dest_table_if_not_exists':[null]
					}),
			};
			this.customer_type=1;
			  	if(this.customer_type!==1){
			  		this.group['tableConfig'] = this.fb.array([
								this.fb.group({
									'source_table':[null,Validators.required],
									'destination_table':[null,Validators.required],
									'create_destination_table_if_not_exists':['yes'],
									'related_tables':[null],
									'condition':[null,Validators.required],
								}),
							]);
			  	}
			  	else{
			  		delete this.group['tableConfig'];
			  	}
			  this.serverConfigForm=this.fb.group(this.group);
	}

  	ngOnInit() {
	  //this.serverConfigForm.patchValue({
		  //'database_config':{
			//   'mysql_source_host':'127.0.0.1',
			//   'mysql_source_username':'root',
			//   'mysql_source_password':'support2019',
			//   'mysql_source_port':'3307',
			//   'mysql_source_database':'mydb',
			//   'mysql_destination_host':'127.0.0.1',
			//   'mysql_destination_username':'root',
			//   'mysql_destination_password':'support2019',
			//   'mysql_destination_port':'3307',
			//   'mysql_destination_database':'world',
			 // 'mysql_select_module':'collection',
			//   'customer_type':'1',
			//   'create_dest_table_if_not_exists':true

			//}
	//  });
	}
  
	get DC(): any {
		return this.serverConfigForm.get('database_config');
	}
	getTcFormArray(){
		return this.serverConfigForm.get('tableConfig') as FormArray;
	}
	addTableConfig(){
		this.getTcFormArray().push(
			this.fb.group({
				'source_table':[null,Validators.required],
				'destination_table':[null,Validators.required],
				'create_destination_table_if_not_exists':['yes'],
				'related_tables':[null],
				'condition':[null,Validators.required],
			})
		);
	}
	delTableConfig(index: number){
		if(this.getTcFormArray().length>1){
			this.getTcFormArray().removeAt(index);
		}else{
			alert("Cannot remove the last instance.");
		}
	}
	onSubmit(){
		if(this.serverConfigForm.valid){
			this.isDataProcessCompleted=false;
			this.errorMessage='';
			this.hasError=false;
			/** spinner starts on init */
			this.spinner.show();
			let databaseConfig=this.serverConfigForm.get('database_config').value;
			let databaseConfigKey=databaseConfig.mysql_source_database;
			let tableLevelConfig={};
			let dbConfig={
					[databaseConfigKey]:databaseConfig
			}
			let inputData;
			 inputData={
				'database_config':dbConfig
			};
			
			
			if(Number(this.customer_type)!=1){
				let tableConfig=this.serverConfigForm.get('tableConfig').value;
				let j=0;
				
				tableConfig.forEach(element => {
					tableLevelConfig[element.source_table]=element
					j++;
				});
				if(tableConfig.length==j){
					let dbConfig={
						[databaseConfigKey]:databaseConfig
					}
					inputData={
						'database_config':dbConfig,
						'table_config':{[databaseConfigKey]:tableLevelConfig}
					};
				}
			}
			
			this.http.postData('db/archive-manual',inputData).subscribe(data=>{
				this.spinner.hide();
				if(data.status_code=='200'){
					/* this.serverConfigForm.reset(); */
					this.isDataProcessCompleted=true;
					this.successMessage=data.message;
					this.archivalResult=data.affected_rows;
				}
				else{
					this.hasError=true;
					this.errorMessage=data.message;
				}
			});
		}
	}
	clearFormData(){
		// this.isDataProcessCompleted=false;
		// 	this.errorMessage='';
		// 	this.hasError=false;
		// this.serverConfigForm.reset();
		window.location.reload();
	}
	saveConfig(){
		if(this.serverConfigForm.valid){
			this.isDataProcessCompleted=false;
			this.errorMessage='';
			this.hasError=false;
			/** spinner starts on init */
			this.spinner.show();
			let databaseConfig=this.serverConfigForm.get('database_config').value;
			let databaseConfigKey=databaseConfig.mysql_source_database;
			let tableConfig=this.serverConfigForm.get('tableConfig').value;
			let tableLevelConfig={};
			let j=0;
			
			tableConfig.forEach(element => {
				tableLevelConfig[element.source_table]=element
				j++;
			});
			if(tableConfig.length==j){
				let dbConfig={
					[databaseConfigKey]:databaseConfig
			}
			let inputData={
				'database_config':dbConfig,
				'table_config':{[databaseConfigKey]:tableLevelConfig}
			};
			this.http.postData('db/saveconfig',inputData).subscribe(data=>{
				this.spinner.hide();
				if(data.status_code=='200'){
					this.serverConfigForm.reset();
					this.isDataProcessCompleted=true;
					this.successMessage=data.message;
				}
				else{
					this.hasError=true;
					this.errorMessage=data.message;
				}
				});
			}
		}	
	}

	setReplyTypeValue() {
		let databaseConfig=this.serverConfigForm.get('database_config').value;
		this.customer_type=databaseConfig.customer_type;
		if(this.customer_type!==1){
			this.serverConfigForm.patchValue({
				'database_config':{
					'mysql_select_module':'Module Name'
				}});
  		this.group['tableConfig'] = this.fb.array([
					this.fb.group({
						'source_table':[null,Validators.required],
						'destination_table':[null,Validators.required],
						'create_destination_table_if_not_exists':['yes'],
						'related_tables':[null],
						'condition':[null,Validators.required],
					}),
				]);  			
  		}
  		else{
			 delete this.group['tableConfig'];
    		 window.location.reload();
  		}
  		this.serverConfigForm=this.fb.group(this.group);
  		console.log(this.serverConfigForm);
	}
	
}
