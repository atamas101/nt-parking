import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'slot',
  templateUrl: './slot.component.html'
})
export class SlotComponent {
  @Input() user;
  ngOnInit() {
    console.log('user in slot: ', this.user.user);
  }
}
