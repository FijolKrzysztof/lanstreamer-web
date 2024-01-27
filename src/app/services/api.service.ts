import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  get authorizationHeader(): { Authorization: string } {
    return {'Authorization': `Bearer ${this.bearerToken}`}
  }

  bearerToken!: string;
}
