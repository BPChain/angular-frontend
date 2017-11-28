import { Component, OnInit } from '@angular/core';
import { PublicStatsService, } from "../services/public-stats.service";
import { PublicStats} from "../services/PublicStats";


@Component({
  selector: 'app-public-stats',
  templateUrl: './public-stats.component.html',
  styleUrls: ['./public-stats.component.css'],
  providers: [PublicStatsService]
})
export class PublicStatsComponent implements OnInit {
  refresh: boolean = true;
  stats: any;
  interval: any;

  constructor(private publicStatsService: PublicStatsService) {
  }

  ngOnInit() {
    this.load();

    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 15000);
  }


  ngOnDestroy() {
    clearInterval(this.interval);
  }

  reset():void{}

  private load(){
    this.publicStatsService.query()
      .subscribe(
        response => {
          console.log(response);
          this.stats = response;
        })
  }

}

