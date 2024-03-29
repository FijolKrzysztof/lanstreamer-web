import {ChangeDetectionStrategy, Component, HostBinding, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home-input-dialog',
  templateUrl: './home-input-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class HomeInputDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HomeInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string,
  ) {}

  @HostBinding('class')
  private readonly hostClass = 'home-input-dialog-component';

  readonly formControl: FormControl<string> = new FormControl();

  onSubmit(): void {
    this.dialogRef.close(this.formControl.value);
  }
}
