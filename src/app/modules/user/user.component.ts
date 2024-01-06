import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {AdminService} from "../../services/admin.service";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {OperatingSystem} from "../../data/models/enums/operating-system";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {catchError, take} from "rxjs";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
})
export class UserComponent {

  constructor(
    private readonly adminService: AdminService,
    private readonly notificationService: NotificationService,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'user-component';

  readonly OperatingSystem = OperatingSystem;

  readonly osControl = new FormControl<OperatingSystem>(OperatingSystem.Windows);

  onFileSelected(fileInputEvent: any) {
    this.adminService.uploadDesktopApp(this.osControl.value!, fileInputEvent.target.files[0]).pipe(
      catchError(err => this.notificationService.handleAndShowError(err, 'Something went wrong!')),
      take(1),
    ).subscribe(); // TODO: dodać potwierdzenie że się udało, oraz ładowanie (spinner)
  }

  // TODO: aplikacja się zbyt wolno pobiera

}
