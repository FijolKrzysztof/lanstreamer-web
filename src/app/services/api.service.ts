import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // TODO: w lanstramer code jak jest błąd przy połączeniu sse to nie otwierać strony z logiwaniem

  get authorizationHeader(): { Authorization: string } {
    return {'Authorization': `Bearer ${this.bearerToken}`}
  }

  bearerToken!: string;
}
