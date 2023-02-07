import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadUsers, removeUser } from 'src/app/store/user/user.action';
import { User } from 'src/app/store/user/user.model';
import { selectAllUsers } from 'src/app/store/user/user.selector';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass'],
})
export class UsersListComponent {
  displayedColumns: string[] = ['name', 'email', 'action'];
  dataSource!: MatTableDataSource<User>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public filterValue!: string;
  filterValueCahnged = new Subject<string>();

  constructor(
    public store: Store<AppState>,
    private dialog: MatDialog,
    private toastService: HotToastService
  ) {
    this.filterValueCahnged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value: string) => {
        this.dataSource.filter = value.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      });
  }

  openAlertOnError(text: string, durationInSeconds?: number) {
    this.toastService.error(text,{
      dismissible: true,
      duration: durationInSeconds && durationInSeconds * 1000
    })
  }

  updateUser(user: User): void {
    this.dialog.open(AddUserComponent, {
      data: user,
    });
  }

  deleteUser(id: string): void {
    this.store.dispatch(removeUser({ id }));
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
    this.store
      .select((state: AppState) => state.users.error)
      .subscribe((err) => err && this.openAlertOnError(err , 3));

    this.store.select(selectAllUsers).subscribe({
      next: (res: User[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
