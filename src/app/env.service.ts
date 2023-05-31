import {Injectable} from "@angular/core";
import {environment} from "../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  get baseURL(): string {
    return environment.serverURL;
  }
}
