import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/api';

  constructor( private httpClient: HttpClient) { }

  getAll() {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(this.baseUrl, options)
      .toPromise();
  }
}
