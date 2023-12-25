import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../data/dto/user-dto";
import {Observable} from "rxjs";
import {LoginResponse} from "../data/dto/responses/login-response";

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
    return `${this.apiService.baseURL}/api/user`
  }

  public login(user: UserDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user);
  }
}
