import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  get baseURL(): string {
    return environment.serverURL;
  }

  get authorizationHeader(): { Authorization: string } {
    return {'Authorization': `Bearer ${this.bearerToken}`}
  }

  bearerToken!: string;
}
