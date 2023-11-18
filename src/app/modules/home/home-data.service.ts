import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ClientDto} from "../../data/dto/client-dto";

@Injectable()
export class HomeDataService {
  readonly client = new BehaviorSubject<ClientDto>({
    id: -1,
    feedbacks: []
  });
}
