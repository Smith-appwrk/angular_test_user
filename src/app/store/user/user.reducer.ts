import { createReducer, on } from '@ngrx/store';
import { userState } from './user.model';
import { addUserSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, removeUser, removeUserSuccess, updateUser, updateUserSuccess } from './user.action';

const initialState: userState = {
  users: [],
  error: null,
  status: 'pending',
};

export const userReducer = createReducer(
  initialState,

  on(addUserSuccess, (state, { user }) => {
    return {
    ...state,
    users: [...state.users, user],
  }}),

  on(updateUserSuccess, (state, { user: updatedUser , id }) => ({
    ...state,
    users: state.users.map((user) => user.id === id ? updatedUser : user),
  })),

  on(removeUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),

  on(loadUsers, (state) => ({ ...state, status: 'loading' })),

  on(loadUsersSuccess , (state , {users}) => ({
    ...state,
    users: users,
    error: null,
    status: 'success'
  })),

  on(loadUsersFailure , (state , {error}) => ({
    ...state,
    error: error,
    status: 'error'
  }))
);
