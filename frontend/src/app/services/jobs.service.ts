import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  // constructor() { }
  private key = 'jobs';

  setjobs(data: any){
    // console.log("--- DATA: \n",data);
    
    const localjobs = this.getjobs();
    // console.log("--- LOCAL: \n",localjobs);
    
    let temp = [];
    for(let i = 0 ; i < data.length; i++){
      temp.push(data[i]);
    }
    // console.log("--- TEMP: \n",temp);
    
    const ids = localjobs != null ? temp.concat(localjobs) : temp;
    // console.log("--- JOBS: \n",ids);
    
    const jobsid = JSON.stringify(ids);
    localStorage.setItem(this.key, jobsid);
  }

  getjobs(){
    const jobsid = localStorage.getItem(this.key);
    return jobsid ? JSON.parse(jobsid) : null;
  }

  clearjobs(){
    localStorage.removeItem('jobs');
  }
}
