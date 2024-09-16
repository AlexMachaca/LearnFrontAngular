import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class PersonService {
	constructor(
		private httpClient: HttpClient
	) { }

	private apiUrl = 'http://localhost:8080/person';

	public insert(formData: FormData): Observable<any> {
		return this.httpClient.post('http://localhost:8080/person/insert', formData);//PIPE: una tuberia, lo que hace esto es que cuando falla el internet, el pipe intena hacer tres veces mas el envio.
	}

	public getAll(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/getall`).pipe(retry(3));
    }

	//ELIMINAR
	public delete(id: string): Observable<any> {
		return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
	  }

	//UPDATE
	public updatePerson(personData:FormData):Observable<any>{
		return this.httpClient.post(`${this.apiUrl}/update`,personData).pipe(retry(3));
	}
}