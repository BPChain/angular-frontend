import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export class ChainSelection {
  constructor(public _public: Array<object>, public _private: Array<object>) {
  }

  public isEmpty(): boolean {
    return this._public.length + this._private.length === 0;
  }
}

@Injectable()
export class ChainSelectorService {
  public selectedChains$ = new BehaviorSubject<ChainSelection>(
    new ChainSelection([], [])
  );

  setSelectedChains(selectedChains: ChainSelection) {
    this.selectedChains$.next(selectedChains);
  }
}
