import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/services/api.service';
import {
  addUser,
  addUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  removeUser,
  removeUserSuccess,
  updateUser,
  updateUserSuccess,
} from './user.action';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: ApiService,
    private store: Store<AppState>
  ) {}

  loadUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        from(this.userService.getUsers()).pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) =>
            of(
              loadUsersFailure({
                error: "Can't load users, try after some time.",
              })
            )
          )
        )
      )
    )
  );

  addUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(addUser),
        switchMap(({ user }) =>
          this.userService.addUser(user).pipe(
            map((user) => this.store.dispatch(addUserSuccess({ user }))),
            catchError(() =>
              of(
                this.store.dispatch(
                  loadUsersFailure({
                    error: "Can't add user, try after some time",
                  })
                )
              )
            )
          )
        )
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(updateUser),
        switchMap(({ user, id }) =>
          from(this.userService.updateUser(id, user)).pipe(
            map((user) => this.store.dispatch(updateUserSuccess({ id, user }))),
            catchError(() =>
              of(
                this.store.dispatch(
                  loadUsersFailure({
                    error: "Can't update user, try after some time",
                  })
                )
              )
            )
          )
        )
      ),
    { dispatch: false }
  );

  removeUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(removeUser),
        switchMap(({ id }) =>
          from(this.userService.deleteUser(id)).pipe(
            map(() => this.store.dispatch(removeUserSuccess({ id }))),
            catchError(() =>
              of(
                this.store.dispatch(
                  loadUsersFailure({
                    error: "Can't delete user, try after some time",
                  })
                )
              )
            )
          )
        )
      ),
    { dispatch: false }
  );
}
