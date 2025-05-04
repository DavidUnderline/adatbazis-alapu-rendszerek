import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  // constructor() { }
  private key = 'jobs';

  setjobsid(data: any){
    let temp = [];
    for(let i of data){
      temp.push(i.ALLASLEHETOSEG_ID);
    }

    const jobsid = JSON.stringify(temp);
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
