import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  onGoingRequests = 0;

  isLoading = false;

  stateChange: Subject<boolean> = new Subject();

  addRequest(): void {
    this.onGoingRequests += 1;
    this.isLoading = true;
    this.notifyStateChange();
  }

  removeRequest(): void {
    if (this.onGoingRequests > 0) this.onGoingRequests -= 1;

    if (this.onGoingRequests === 0) {
      this.isLoading = false;
      this.notifyStateChange();
    }
  }

  notifyStateChange(): void {
    this.stateChange.next(this.isLoading);
  }
}
