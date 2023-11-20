import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAboutComponent {
  @HostBinding('class')
  private readonly className = 'home-about-component';
}
