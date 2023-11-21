import {ApplicationRef, EmbeddedViewRef, Injectable, Injector, ViewContainerRef} from "@angular/core";
import {NotificationPopupComponent} from "./notification-popup/notification-popup.component";

@Injectable({
  providedIn: 'root',
})
export class NotificationPopupService {

  constructor(
    // private readonly viewContainerRef: ViewContainerRef,
    // private readonly applicationRef: ApplicationRef,
    // private readonly injector: Injector,
  ) {
  }

  openNotificationPopup(component: any) {
    // const componentRef = this.viewContainerRef.createComponent(NotificationPopupComponent);
    // this.applicationRef.attachView(componentRef.hostView);
    // const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    //
    // document.body.appendChild(domElem);
  }
}
