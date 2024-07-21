// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private apiUrl = 'http://localhost:3000/angestellte';
    private converterUrl = 'http://localhost:3000/convert';
  
    constructor(private http: HttpClient) { }
  
    getData(): Promise<any> {
      return fetch(this.apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        });
    }


    convertVttToSrt(vttContent: string): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { vtt: vttContent };
      return this.http.post(this.converterUrl, body, { headers });
    }
  }
