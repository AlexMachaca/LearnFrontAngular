import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class OfficeService {
	constructor(
		private httpClient: HttpClient
	) { }

    private apiUrl = 'http://localhost:8080/office';

    public insert(formData: FormData): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/insert`, formData).pipe(retry(3));//PIPE: una tuberia, lo que hace esto es que cuando falla el internet, el pipe intena hacer tres veces mas el envio.
	}

    public getAll(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.apiUrl}/getall`).pipe(retry(3));
    }

    public delete(codigo: string): Observable<any> {
		return this.httpClient.delete<any>(`${this.apiUrl}/${codigo}`);
	}

    public update(officeData:FormData):Observable<any>{
		return this.httpClient.post(`${this.apiUrl}/update`,officeData).pipe(retry(3));
	}

	public search(query: string): Observable<any[]> {
		// Construye la URL con el parámetro de búsqueda
		const url = `${this.apiUrl}/search?query=${encodeURIComponent(query)}`;
		return this.httpClient.get<any[]>(url).pipe(retry(3)); // Usa retry si es necesario
	  }

}