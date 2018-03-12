import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
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
  private login: string;
  private usernameInput: FormControl;
  private passwordInput: FormControl;

  constructor(
    public dialogReference: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private _userAuthentication: UserAuthenticationService,
    public snackBar: MatSnackBar,
  ) {
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  submitCredentials(username: string, password: string): void {
    this._userAuthentication
      .authenticate(username, password)
      .subscribe(success => {
        if (success) {
          this.dialogReference.close(true);
        } else {
          this.options.value.color = 'warn';
          this.openSnackBar('Invalid Credentials');
        }
      },
      err => {
        this.options.value.color = 'warn';
      });
  }

  onNoClick(): void {
    this.dialogReference.close(false);
  }
}
