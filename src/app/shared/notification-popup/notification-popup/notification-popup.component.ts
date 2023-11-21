import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {ComponentPortal, DomPortal, DomPortalOutlet, Portal, PortalModule} from "@angular/cdk/portal";

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, PortalModule]
})
export class NotificationPopupComponent {

  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'notification-popup-component'

  showSomething = '123';

  portalOutlet!: Portal<any>;

  onClick() {
    console.log('hello')
    this.showSomething = '44444'
    this.cdr.markForCheck();

    console.log('ddd', this.portalOutlet)
  }
}
