import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  // constructor() { }
  private key = 'jobs';

  setjobs(data: any){
    // console.table(data);
    
    const localjobs = this.getjobs();
    
    let temp = [];
    for(let i = 0 ; i < data.length; i++){
      temp.push(data[i]);
    }

    const ids = localjobs != null ? temp.concat(localjobs) : temp;
    // console.log(ids);
    
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
