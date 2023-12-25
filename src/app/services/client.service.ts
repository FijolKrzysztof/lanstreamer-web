import {Injectable} from "@angular/core";
import {ClientDto} from "../data/dto/client-dto";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {OperatingSystem} from "../data/models/enums/operating-system";

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

  create(client: ClientDto): Observable<ClientDto> {
    return this.http.post<ClientDto>(this.baseUrl, client);
  }

  addFeedback(clientId: number, feedback: string) {
    return this.http.post(`${this.baseUrl}/${clientId}/feedback`, feedback);
  }

  updateSessionDuration(clientId: number): void {
    navigator.sendBeacon(`${this.baseUrl}/${clientId}/update-session-duration`);
  }

  downloadApp(clientId: number, operatingSystem: OperatingSystem): Observable<string> { // TODO: typ zwracany
    return this.http.get<string>(`${this.baseUrl}/${clientId}/download-app/${operatingSystem}`);
  }
}
