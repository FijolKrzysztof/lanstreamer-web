import {ChangeDetectionStrategy, Component, HostBinding, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-home-input-dialog',
  templateUrl: './home-input-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeInputDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HomeInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string,
  ) {}

  @HostBinding('class')
  private readonly hostClass = 'on-leave-modal-component';

  readonly formControl = new FormControl();

  onSubmit(): void {
    this.dialogRef.close(this.formControl.value);
  }
}
