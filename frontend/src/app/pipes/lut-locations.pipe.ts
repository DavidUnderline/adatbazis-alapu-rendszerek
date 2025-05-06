import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { response } from 'express';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Pipe({
  name: 'lutLocations'
})
export class LutLocationsPipe implements PipeTransform {
  constructor(private http: HttpClient) {}
  transform(id: number): Observable<string> {
    return this.http.post<{ success: boolean, city: string }>(
      'http://localhost:3000/terulet/api/getCityById',
      { id }
    ).pipe(
      map(response => response.city),
      catchError(() => of('Ismeretlen'))
    );
  }
}
