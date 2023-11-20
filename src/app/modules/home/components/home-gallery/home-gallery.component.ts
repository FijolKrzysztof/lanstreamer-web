import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeGalleryComponent {
  @HostBinding('class')
  private readonly className = 'home-gallery-component';
}
