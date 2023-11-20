import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../data/dto/user-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private readonly apiService: ApiService,
    private readonly http: HttpClient,
  ) {
  }

  get baseUrl(): string {
    return `${this.apiService.baseURL}/api/client`
  }

  public login(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/login`, user);
  }
}
