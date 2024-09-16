import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  private apiUrl = 'http://localhost:8080/person';

  /*constructor(
    private httpClient:HttpClient
  ) {  }*/

  private httpClient=inject(HttpClient)

  public indexGet():Observable<any>{
    return this.httpClient.get('http://localhost:8080/');
  }
}
