import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private apiUrl = 'http://localhost:8080/user';

  public login(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, formData).pipe(retry(3));
  }

  existsSession(): boolean {
    //return localStorage.getItem('idUser') != undefined && localStorage.getItem('idUser') != null && localStorage.getItem('idUser') != '';
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');

    return !!idUser && !!token;
  }

  logout() {
    localStorage.removeItem('idUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
  }
}
