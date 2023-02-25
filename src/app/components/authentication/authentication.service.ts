import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
  ) { }

  authenticate(code: string, mail: string): Observable<void> {
    return this.http.post<void>(`http://lanstreamer.com:5000/api/main/authorize/${code}`, {Mail: mail});
  }
}
