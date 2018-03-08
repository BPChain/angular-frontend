import { Component } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public leftSliderIcon: string;
  public rightSliderIcon: string;

  constructor(public dialog: MatDialog) {
    this.leftSliderIcon = 'keyboard_arrow_right';
    this.rightSliderIcon = 'keyboard_arrow_left';
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

  openLoginDialog() {
    const dialogReference = this.dialog.open(LoginDialogComponent, {
      width: '350px',
    });
  }

}
