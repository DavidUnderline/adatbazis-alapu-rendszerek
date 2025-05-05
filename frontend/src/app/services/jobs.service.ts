import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  // constructor() { }
  private key = 'jobs';

  setjobsid(data: any){
    const localjobs = this.getjobsid();
    
    let temp = [];
    for(let i of data){
      temp.push(i.ALLASLEHETOSEG_ID);
    }

    const ids = localjobs != null ? temp.concat(localjobs) : temp;
    console.log(ids);
    
    const jobsid = JSON.stringify(ids);
    localStorage.setItem(this.key, jobsid);
  }

  getjobsid(){
    const jobsid = localStorage.getItem(this.key);
    return jobsid ? JSON.parse(jobsid) : null;
  }

  clearjobsid(){
    localStorage.removeItem('jobs');
  }
}
