import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'manage-user';

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(AddUserComponent, {
      width: '30%',
    })
  }

  


}