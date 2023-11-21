import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, inject, Injector, Type} from "@angular/core";
import {NotificationPopupComponent} from "./notification-popup/notification-popup.component";
import {ComponentPortal, DomPortal, DomPortalOutlet, Portal, PortalOutlet} from "@angular/cdk/portal";

export const openNotificationPopup = (component: Type<any>, injector: Injector, appRef: ApplicationRef): void => {
  // injector = inject(Injector)
  // appRef = inject(ApplicationRef)

  let fixedContainer = document.getElementById('fixed-container');
  if (!fixedContainer) {
    fixedContainer = document.createElement('div');
    fixedContainer.id = 'fixed-container';
    fixedContainer.style.position = 'fixed';
    fixedContainer.style.top = '0';
    fixedContainer.style.right = '0';
    fixedContainer.style.overflow = 'hidden';
    document.body.appendChild(fixedContainer);
  }

  const componentFactoryResolver = injector.get(ComponentFactoryResolver);
  const notificationPopupFactory = componentFactoryResolver.resolveComponentFactory(NotificationPopupComponent);
  const notificationPopupRef = notificationPopupFactory.create(injector);

  appRef.attachView(notificationPopupRef.hostView);

  notificationPopupRef.instance.portalOutlet = new ComponentPortal(component);

  const domElement = (notificationPopupRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  fixedContainer.appendChild(domElement); // TODO: raczej zamienić na service albo te injectory jakoś inaczej zrobić
}
