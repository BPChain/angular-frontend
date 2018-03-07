import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public leftSliderIcon = 'keyboard_arrow_right';
  public rightSliderIcon = 'keyboard_arrow_left';

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

}
