import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserAuthenticationService } from './services/user-authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public leftSliderIcon: string;
  public rightSliderIcon: string;
  private isAuthenticated: boolean;

  constructor(
    public dialog: MatDialog,
    private _userAuthentication: UserAuthenticationService,
    public snackBar: MatSnackBar
  ) {
    this.leftSliderIcon = 'keyboard_arrow_left';
    this.rightSliderIcon = 'keyboard_arrow_left';
    this.isAuthenticated = false;
  }

  getNewIcon(oldIcon: string) {
    if (oldIcon === 'keyboard_arrow_left') {
      return 'keyboard_arrow_right';
    } else {
      return 'keyboard_arrow_left';
    }
  }

  leftSliderOnClick(snavLeft) {
    this.leftSliderIcon = this.getNewIcon(this.leftSliderIcon);
    snavLeft.toggle();
  }

  rightSliderOnClick(snavRight) {
    this.rightSliderIcon = this.getNewIcon(this.rightSliderIcon);
    snavRight.toggle();
  }

  triggerLogout() {
    this._userAuthentication
      .logout()
      .subscribe(res => {
        this.isAuthenticated = false;
        this.openSnackBar('Successfully logged out.');
      },
      err => {
        this.openSnackBar('Logout was not successful.');
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  openLoginDialog() {
    const dialogReference = this.dialog.open(LoginDialogComponent, {
      width: '350px',
    });

    dialogReference.afterClosed().subscribe(result => {
      if (result === true) {
        this.openSnackBar('Successfully logged in.');
        this.isAuthenticated = true;
      }
    });
  }

  ngOnInit() {
    this._userAuthentication
      .checkAuthenticationStatus()
      .subscribe(result => {
        if (result === true) {
          this.isAuthenticated = true;
        }
      });
  }

}
