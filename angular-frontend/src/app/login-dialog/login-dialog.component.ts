import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  private options: FormGroup;

  constructor(
    public dialogReference: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private _userAuthentication: UserAuthenticationService) {
    this.options = fb.group({
      'color': 'primary',
    });
  }

  submitCredentials(username: string, password: string): void {
    this._userAuthentication
      .authenticate(username, password)
      .subscribe(res => {
        console.info(res);
    });
  }

  onNoClick(): void {
    this.dialogReference.close();
  }
}
