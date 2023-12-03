import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {

  onFileSelected() {
    // const inputNode: any = document.querySelector('#file');
    //
    // if (typeof (FileReader) !== 'undefined') {
    //   const reader = new FileReader();
    //
    //   reader.onload = (e: any) => {
    //     this.srcResult = e.target.result;
    //   };
    //
    //   reader.readAsArrayBuffer(inputNode.files[0]);
    // }
  }
}
