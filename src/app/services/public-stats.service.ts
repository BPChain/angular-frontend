import { Injectable } from '@angular/core';
import { RestService} from "./rest.service";

@Injectable()
export class PublicStatsService extends RestService {
  resource: string = '/ethereum/publicStat'
}
