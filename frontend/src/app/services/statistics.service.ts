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
    sum_allasok_count : number
  }> {
    let result: { megyek: string[]; allasok_megyenkent: number[] } = { megyek: [], allasok_megyenkent: [] };
    let count = 0
    console.log('statistics service');
    const response: any = await this.http.post(this.url + 'munkaEroHiany', {}).toPromise();
    console.log(response.result);
    if (response.success) {
      response.result.forEach((data: any) => {
        console.log(data);
        result.megyek.push(data.MEGYE as string);
        result.allasok_megyenkent.push(data.ALLASOK_SZAMA as number);
        count += data.ALLASOK_SZAMA;
      });
    } else {
      console.error(response.message);
    }
    return { ...result, sum_allasok_count: count };
  }
}
