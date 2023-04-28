import {Injectable} from '@angular/core';
import {DownloadType} from "./home-page.component";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getDownloadLink(type: DownloadType): Observable<string> {
    return this.http.get(`${environment.serverURL}/api/main/download/${type}`, {responseType: 'text'});
  }

  sendReferrer(referrer: string): Observable<void> {
    return this.http.post<void>(`${environment.serverURL}/api/main/referrer`, {name: referrer});
  }
}
