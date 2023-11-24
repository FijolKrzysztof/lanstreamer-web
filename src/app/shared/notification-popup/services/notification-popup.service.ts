import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type} from "@angular/core";
import {NotificationPopupComponent} from "../notification-popup.component";
import {ComponentPortal} from "@angular/cdk/portal";
import {Observable, skip} from "rxjs";
import {ThemePalette} from "@angular/material/core";

export interface NotificationPopupConfig {
  theme: ThemePalette;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationPopupService<T, R = T> {

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly injector: Injector,
  ) {
  }

  openNotificationPopup(component: Type<any>, data: T, config?: NotificationPopupConfig): Observable<R> {
    let popupContainer = document.getElementById('notification-popup-container');
    if (!popupContainer) {
      popupContainer = document.createElement('div');
      popupContainer.id = 'notification-popup-container';
      document.body.appendChild(popupContainer);
    }

    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    const notificationPopupFactory = componentFactoryResolver.resolveComponentFactory(NotificationPopupComponent);
    const notificationPopupRef = notificationPopupFactory.create(this.injector);

    this.applicationRef.attachView(notificationPopupRef.hostView);

    notificationPopupRef.instance.config = config;
    notificationPopupRef.instance.data = data;
    notificationPopupRef.instance.portalOutlet = new ComponentPortal(component);

    const domElement = (notificationPopupRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    popupContainer.appendChild(domElement);

    notificationPopupRef.instance.closePopup$.subscribe(() => {
      this.applicationRef.detachView(notificationPopupRef.hostView);
      notificationPopupRef.destroy();
    });

    return ((notificationPopupRef.instance.emitData$) as Observable<R>).pipe(skip(1));
  }
}
