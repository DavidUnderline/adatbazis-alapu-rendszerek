import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CegErtekelesServiceService {
  private url = 'http://localhost:3000/ceg/api/';

  constructor(private http: HttpClient) {}

  async setErtekeles(rating: number, user_email: string, ceg_ado: number) {
    const result = await this.http
      .post(this.url + 'setCegErtekeles', {
        rating: rating,
        user_email: user_email,
        ceg_ado: ceg_ado,
      })
      .toPromise();
  }

  async getCegErtekeles(ceg_ado: string, user_email?: string): Promise<number> {
    let rating = 0
    const result : any = await this.http
      .post(this.url + 'getCegErtekeles', {
        ceg_ado: ceg_ado,
        user_email: user_email,
      })
      .toPromise();
      console.log(result);
      if(result.success)
        rating = result.result[0]?.ERTEKELES ?? 0;
      console.log("rating",rating)

      return rating;
  }
}
