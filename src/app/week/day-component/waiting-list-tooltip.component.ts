import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'waiting-list-tooltip',
  templateUrl: 'waiting-list-tooltip.html'
})
export class WaitingListTooltip {
  @Input() waitingList;
  tooltipList;
  ngOnInit() {
    this.tooltipList = this.waitingList.map(personObj => personObj.name);
  }
}
