import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHeaderComponent {
  @HostBinding('class')
  private readonly className = 'home-header-component';
}
