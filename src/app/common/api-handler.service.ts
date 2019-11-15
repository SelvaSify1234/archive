import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpEvent,HttpRequest} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
  //private baseUrl : string = 'http://223.30.223.76:8080/';
 // private baseUrl : string = 'http://localhost:8080/';
  private baseUrl : string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'Content-Length', 
    })
  };
  getBaseURL(){
    return this.baseUrl;
  }
  getAll (url : string): Observable<any> {
    return this.http.get<any>(this.baseUrl+url,this.httpOptions)
      .pipe(
        catchError(this.handleError('getAllE', []))
      );
  }

  // Get data using ID from server -- GET Method
  getDataById(url : string, id: number): Observable<any[]> {
    const geturl = `${this.baseUrl}/${url}/?id=${id}`;
    return this.http.get<any[]>(geturl,this.httpOptions)
    .pipe(
      catchError(this.handleError(`getDataE id=${id}`,[]))
    );
  }

  // Search data using string -- GET Method
  searchData(url : string,term: string): Observable<any[]> {
    const geturl = `${this.baseUrl}/${url}/?search=${term}`;
    return this.http.get<any[]>(geturl,this.httpOptions).
    pipe(
      catchError(this.handleError<any[]>('searchHeroes',[]))
    );
  }

  //Save data to the server {JSON Format} -- POST Method
  postData (url : string,postData : any): Observable<any> {
/*Commented By Selva */
   // return this.http.post<any>(this.baseUrl+url, postData,this.httpOptions).pipe(
    return this.http.post<any>(this.baseUrl+url, postData,{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) } ).pipe(
      catchError(this.handleError('postDataE',[]))
    );
  }
  // uploda the files into sever
  pushFileToStorage(file: File,url:string): Observable<any> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    return this.http.post<any>(this.baseUrl+url, formdata).pipe(
      catchError(this.handleError('postDataE',[]))
    );
    /* const req = new HttpRequest('POST',this.baseUrl+url, formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req); */
  }
  //Save data to the server {JSON Format} -- POST Method without Authentication
  postDataNoAuth (url : string,postData : any[]): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl+url, postData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) } ).pipe(
     catchError(this.handleError('postDataE',[]))
    );
  }

  //Update data to the server by its id {JSON Format} -- PUT Method
  updateData (url : string,postData : any[],id: number): Observable<any[]> {
    const geturl = `${this.baseUrl}/${url}/?id=${id}`;
    return this.http.put<any[]>(geturl, postData, this.httpOptions)
    .pipe(
      catchError(this.handleError('updateDataE',[]))
    );
  }

  //Delete data from the server by its id   -- PUT Method
  deleteData (url : string,id: number): Observable<any[]> {
    const geturl = `${this.baseUrl}/${url}/${id}`;
    return this.http.delete<any[]>(url,this.httpOptions).pipe(
      catchError(this.handleError('deleteDataE',[]))
    );
  }

  //Error Handling
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      
      // Send error to the requested page.
      return of(error as T);

      // Let the app keep running by returning an empty result.
      //return of(result as T);
    };
  }

  /** Log a HTTPService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
    console.log('HTTPService: ' + message);
  }
}
