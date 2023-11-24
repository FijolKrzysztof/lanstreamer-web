import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class NotificationPopupDataService<T, R = T> {

  data!: T;

  closePopup(): void {
    this.closePopupSubject.next(null);
  }

  emitData(data: R): void {
    this.emitDataSubject.next(data);
  }

  readonly emitDataSubject = new BehaviorSubject<R>({} as R);
  readonly closePopupSubject = new Subject();
}
