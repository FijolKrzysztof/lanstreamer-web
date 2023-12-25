import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class HomeAboutComponent {
  @HostBinding('class')
  private readonly className = 'home-about-component';
}

// TODO: zrobić gdzieś portale - albo w messageService i w popup będzie można przekazać component albo w dialogu
