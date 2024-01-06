import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {AdminService} from "../../services/admin.service";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {OperatingSystem} from "../../data/models/enums/operating-system";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject, catchError, take} from "rxjs";
import {NotificationService} from "../../services/notification.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgIf,
    AsyncPipe
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
  readonly loading = new BehaviorSubject<boolean>(false);

  onFileSelected(fileInputEvent: any) {
    this.loading.next(true);
    this.adminService.uploadDesktopApp(this.osControl.value!, fileInputEvent.target.files[0]).pipe(
      catchError(err => {
        this.loading.next(false);
        return this.notificationService.handleAndShowError(err, 'Something went wrong!')
      }),
      take(1),
    ).subscribe(() => {
      this.loading.next(false);
    }); // TODO: dodać potwierdzenie że się udało, oraz ładowanie (spinner)
  }

  // TODO: aplikacja się zbyt wolno pobiera

}
