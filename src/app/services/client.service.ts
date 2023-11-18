import {Injectable} from "@angular/core";
import {ClientDto} from "../data/dto/client-dto";
import {Observable, of} from "rxjs";
import {EnvService} from "./env.service";
import {HttpClient} from "@angular/common/http";
import {OperatingSystem} from "../data/models/enums/operating-system";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private readonly envService: EnvService,
    private readonly http: HttpClient,
  ) {
  }

  get baseUrl(): string {
    return `${this.envService.baseURL}/api/client`
  }

  create(client: ClientDto): Observable<ClientDto> {
    return this.http.post<ClientDto>(this.baseUrl, client);
  }

  update(client: ClientDto): Observable<ClientDto> {
    return this.http.put<ClientDto>(this.baseUrl, client);
  }

  updateSessionDuration(clientId: number): Observable<void> {
    const url = `${this.baseUrl}/${clientId}/update-session-duration`;

    if (navigator.sendBeacon) {
      const result = navigator.sendBeacon(url);

      if (result) {
        return of();
      }
    }

    return this.http.post<void>(url, null);
  }

  downloadApp(clientId: number, operatingSystem: OperatingSystem): Observable<string> { // TODO: typ zwracany
    return this.http.get<string>(`${this.baseUrl}/${clientId}/download-app/${operatingSystem}`);
  }
}
