import { createAction, props } from "@ngrx/store";
import { User } from "./user.model";


export const addUser = createAction(
    '[User List Page] add user',
    props<{user: User}>()
)

export const addUserSuccess = createAction(
    '[User List Page] add user success',
    props<{user: User}>()
)

export const updateUser = createAction(
    '[User List Page] updating user',
    props<{user: User , id : string}>()
)

export const updateUserSuccess = createAction(
    '[User List Page] user updated successfully',
    props<{user: User , id : string}>()
)

export const removeUser = createAction(
    '[User List Page] remove user',
    props<{id: string}>()
)

export const removeUserSuccess = createAction(
    '[User List Page] remove user success',
    props<{id: string}>()
)

export const loadUsers = createAction(
    '[User List Page] load user'
)

export const loadUsersSuccess = createAction(
    '[User List Page] users loaded successfully',
    props<{users: User[]}>()
)

export const loadUsersFailure = createAction(
    '[User List Page] users failed to load',
    props<{error: string}>()
)