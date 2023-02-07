import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import * as uuid from 'uuid';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addUser, updateUser } from 'src/app/store/user/user.action';
import { User } from 'src/app/store/user/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  formType: string = 'add';

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AppComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public editUserData: User
  ) {}

  addUpdateUser(): void {
    if (this.userForm.valid) {
      if (!this.editUserData) {
        this.store.dispatch(
          addUser({ user: { ...this.userForm.value, id: uuid.v4() } })
        );
      } else {
        this.store.dispatch(
          updateUser({ user: this.userForm.value, id: this.editUserData.id })
        );
      }
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });

    if (this.editUserData) {
      this.formType = 'update';
      this.userForm.controls['name'].setValue(this.editUserData.name);
      this.userForm.controls['email'].setValue(this.editUserData.email);
    }
  }
}
