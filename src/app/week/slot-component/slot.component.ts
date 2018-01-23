import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent {
  @Input() user;
}
