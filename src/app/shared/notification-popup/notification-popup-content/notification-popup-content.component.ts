import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-notification-popup-content',
  templateUrl: './notification-popup-content.component.html',
  styleUrls: ['./notification-popup-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationPopupContentComponent {

  @ViewChild('container', {read: ElementRef})
  readonly container!: ElementRef;
}
