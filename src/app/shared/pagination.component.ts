import { Component, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { UsersComponent } from '../users/users-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'list-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() incomingList;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.incomingList.paginator = this.paginator;
  }
}
