import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';

// import { UsersComponent } from '../../../users/users-list.component';

@Component({
  selector: 'list-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements AfterViewInit {
  @Input() incomingList;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.incomingList.paginator = this.paginator;
  }
}
