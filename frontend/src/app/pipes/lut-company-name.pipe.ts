import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { response } from 'express';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Pipe({
  name: 'lutCompanyName',
})
export class LutCompanyNamePipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(ceg_adoazonosito: string): Observable<string> {
    return this.http
      .post<{ name: string }>('http://localhost:3000/ceg/api/getCegByAdo', {
        adoazonosito: ceg_adoazonosito,
      })
      .pipe(
        map((response) => response.name),
        catchError(() => of('Ismeretlen'))
      );
  }
}
