import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  get baseURL(): string {
    return environment.serverURL;
  }

  bearerToken!: string;
}
