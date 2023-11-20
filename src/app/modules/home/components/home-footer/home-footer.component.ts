import {ChangeDetectionStrategy, Component} from '@angular/core';
import {catchError, map, switchMap, take} from "rxjs";
import {ClientService} from "../../../../services/client.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HomeInputDialogComponent} from "../home-input-dialog/home-input-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {HomeDataService} from "../../services/home-data.service";

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFooterComponent {

  constructor(
    private readonly clientService: ClientService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly homeDataService: HomeDataService,
  ) {
  }

  onGiveFeedbackClick() {
    this.openModal('Please, give us your feedback')
  }

  private openModal(title: string): void {
    const dialogRef = this.dialog.open(HomeInputDialogComponent, {
      width: '90vw',
      maxWidth: '400px',
      data: title,
    });

    dialogRef.afterClosed().subscribe((message) => {
      if (message) {
        this.homeDataService.client
          .pipe(
            take(1),
            map(client => {
              client.feedbacks.push(message);
              return client;
            }),
            switchMap(client => this.clientService.update(client!)),
            catchError(err => err), // TODO: obsługa błędów
          )
          .subscribe(() => {
            this.snackBar.open('Thank you for your feedback!', '', {
              duration: 2000,
              verticalPosition: 'bottom',
            });
          });
      }
    });
  }
}
