import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { userState } from './user.model';

export const selectUsers = (state: AppState) => state.users;
export const selectAllUsers =createSelector(
    selectUsers,
    (state: userState) => state.users
)