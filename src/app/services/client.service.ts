import {Injectable} from "@angular/core";
import {ClientDto} from "../data/dto/client-dto";
import {map, Observable} from "rxjs";
import {ApiService} from "./api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OperatingSystem} from "../data/models/enums/operating-system";
import {CreatedObjResponse} from "../data/dto/responses/created-obj-response";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private readonly apiService: ApiService,
    private readonly http: HttpClient,
  ) {
  }

  get baseUrl(): string {
    return `${this.apiService.baseURL}/api/client`
  }

  create(client: ClientDto): Observable<CreatedObjResponse> {
    return this.http.post<CreatedObjResponse>(this.baseUrl, client);
  }

  addFeedback(clientId: number, feedback: string) {
    return this.http.post(`${this.baseUrl}/${clientId}/add-feedback`,  `"${feedback}"`, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  updateSessionDuration(clientId: number): void {
    navigator.sendBeacon(`${this.baseUrl}/${clientId}/update-session-duration`);
  }

  checkFileExists(url: string): Observable<string> {
    return this.http.head(url, {observe: 'response'}).pipe(map(() => url))
  }

  getDownloadLink(clientId: number, operatingSystem: OperatingSystem): string {
    return `${this.baseUrl}/${clientId}/download-app/${operatingSystem}`;
  }
}
