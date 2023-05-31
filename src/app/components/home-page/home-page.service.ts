import {Injectable} from '@angular/core';
import {DownloadType} from "./home-page.component";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnvService} from "../../env.service";

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(
    private http: HttpClient,
    private envService: EnvService,
  ) {
  }

  getDownloadLink(type: DownloadType): Observable<string> {
    return this.http.get(`${this.envService.baseURL}/api/main/download/${type}`, {responseType: 'text'});
  }

  sendReferrer(referrer: string): Observable<void> {
    return this.http.post<void>(`${this.envService.baseURL}/api/main/referrer`, {name: referrer});
  }
}
