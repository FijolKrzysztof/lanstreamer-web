import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenInfo} from "../components/authentication/models/token-info";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private envService: ApiService,
  ) { }

  authenticate(code: string, mail: string): Observable<void> {
    return this.http.post<void>(`${this.envService.baseURL}/api/main/authorize/${code}`, {Mail: mail});
  }

  getTokenInfo(token: string): Observable<TokenInfo> {
    return this.http.get<TokenInfo>(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
  }
}
