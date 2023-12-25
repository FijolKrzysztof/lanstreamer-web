import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {OperatingSystem} from "../data/models/enums/operating-system";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly apiService: ApiService,
    private readonly http: HttpClient,
  ) {
  }

  get baseUrl(): string {
    return `${this.apiService.baseURL}/api/admin`
  }

  uploadDesktopApp(operatingSystem: OperatingSystem, file: File): Observable<void> {
    const formData = new FormData();

    formData.append('file', file);

    const params = new HttpParams().set('operatingSystem', operatingSystem);

    return this.http.post<void>(`${this.baseUrl}/upload-desktop-app`, formData, {params, headers: this.apiService.authorizationHeader});
  }
}
