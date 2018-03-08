import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  private options: FormGroup;
  private hide: boolean;
  private usernameInput: FormControl;
  private passwordInput: FormControl;

  constructor(
    public dialogReference: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private _userAuthentication: UserAuthenticationService) {
    this.options = fb.group({
      'color': 'primary',
    });
    this.hide = true;
    this.usernameInput = new FormControl(
      '',
      [Validators.required]
    );
    this.passwordInput = new FormControl(
      '',
      [Validators.required]
    );
  }

  getUsernameErrorMessage() {
    return this.usernameInput.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  getPasswordErrorMessage() {
    return this.passwordInput.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  submitCredentials(username: string, password: string): void {
    this._userAuthentication
      .authenticate(username, password)
      .subscribe(res => {
        console.info('confirmed');
      },
      err => {
        console.info('Denied!');
        this.options.value.color = 'warn';
      });
  }

  onNoClick(): void {
    this.dialogReference.close();
  }
}
