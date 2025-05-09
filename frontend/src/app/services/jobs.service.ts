import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class JobsService {
  constructor(private http: HttpClient) {}

  showError: boolean = true;
  error_msg: string = '';

  showSuccess:boolean = true;
  success_msg: string = '';

  private key = 'jobs';
  
  private url = 'http://localhost:3000/allasok/api/getjobsforuser';

  getjobs(data: any): Observable<any> {
    return this.http.post<any>(this.url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // getjobs(data: any): any{
  //   console.log("--- get jobs with service ---")
  //   this.http.post<any>('http://localhost:3000/allasok/api/getjobsforuser', data, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }}).subscribe(
  //     response => {
  //       console.log("-- POST RESPONSE --");
  //       console.table(response);
  //       // if (response.success) {
  //       //     return response.jobs;
  //       // } else {
  //       //   this.errorHandler(response.message);
  //       //   return;
  //       // }
  //     },
  //       (error) => {
  //           this.errorHandler(error);
  //       }
  //     );
  //   // const jobsid = localStorage.getItem(this.key);
  //   // return jobsid ? JSON.parse(jobsid) : null;
  // }

  // setjobs(data: any){
  //   console.log("--- DATA: \n",data);

  //   // const localjobs = JSON.parse(localStorage.getItem(this.key));
  //   const localjobs = localStorage.getItem(this.key);
  //   console.log("--- LOCALJOBS: \n",localjobs);
    
  //   let temp = [];
  //   for(let i = 0 ; i < data.length; i++){
  //     temp.push(data[i]);
  //   }
  //   console.log("--- TEMP: \n",temp);
    
  //   const ids = localjobs != null ? temp.concat(JSON.parse(localjobs)) : temp;
  //   console.log("--- JOBS: \n",ids);
    
  //   const jobsid = JSON.stringify(ids);
  //   localStorage.setItem(this.key, jobsid);
  // }


  clearjobs(){
    // localStorage.removeItem('jobs');
  }

  errorHandler(error: string): void{
    console.table(error);
    this.showError = true;
    this.error_msg = error;
  }

  successHandler(success: string){
    this.showSuccess = true;
    this.success_msg = success;
  }
}
