import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private url = 'http://localhost:3000/statistics/api/';
  constructor(private http: HttpClient) {}

  public async getAllasCountByMegye(): Promise<{
    megyek: string[];
    allasok_megyenkent: number[];
    sum_allasok_count: number;
  }> {
    let result: { megyek: string[]; allasok_megyenkent: number[] } = {
      megyek: [],
      allasok_megyenkent: [],
    };
    let count = 0;
    // console.log('statistics service');
    const response: any = await this.http
      .post(this.url + 'munkaEroHiany', {})
      .toPromise();
    // console.log(response.result);
    if (response.success) {
      response.result.forEach((data: any) => {
        // console.log(data);
        result.megyek.push(data.MEGYE as string);
        result.allasok_megyenkent.push(data.ALLASOK_SZAMA as number);
        count += data.ALLASOK_SZAMA;
      });
    } else {
      console.error(response.message);
    }
    return { ...result, sum_allasok_count: count };
  }

  public async getTopCeg(): Promise<{
    cegek: string[];
    jelentkezok_szama: number[];
  }> {
    let result: { cegek: string[]; jelentkezok_szama: number[] } = {
      cegek: [],
      jelentkezok_szama: [],
    };
    const response: any = await this.http
      .post(this.url + 'getTopCeg', {})
      .toPromise();
    // console.log('getTopCeg');
    // console.log(response)
    if (response.success) {
      response.result.forEach((data: any) => {
        // console.log(data);
        result.cegek.push(data.NEVE);
        result.jelentkezok_szama.push(data.JELENTKEZOK_SZAMA);
      });
    } else {
      console.error('');
    }

    return result;
  }

  public async getAvgFizu(): Promise<{
    megyek: string[];
    atlag_berek: number[];
  }> {
    let result: { megyek: string[]; atlag_berek: number[] } = {
      megyek: [],
      atlag_berek: [],
    };
    const response: any = await this.http
    .post(this.url + 'getAvgFizu', {})
    .toPromise();
    if (response.success) {
      response.result.forEach((data: any) => {
        result.megyek.push(data.MEGYE);
        result.atlag_berek.push(data.ATLAG_BER);
      });
    } else {
      console.error('Mákos gubanc van.');
    }
    return result;
  }

  public async getPopularCategories(): Promise<{kategoriak: string[], job_db : number[]}>{
    let result : {kategoriak: string[], job_db : number[]} = {kategoriak: [], job_db: []};
    
    const response : any= await this.http.post(this.url + 'getPopularCategories', {}).toPromise();
    console.log("response", response);
    if(response.success){
      response.result.forEach((data : any) => {
        result.kategoriak.push(data.KATEGORIA_NEVE);
        result.job_db.push(data.JELENTKEZESEK_SZAMA)
      });
    }else{
      console.error("Jaj de fáj a hibázás")
    }

    return result;
  }
}
