import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as userReducer from "./user.reducer";

// export interface State {
//     users: userReducer.State;
//   }
  
//   export const reducers: ActionReducerMap<State> = {
//     users: userReducer.reducer,
//   };
  

export const selectUserState = createFeatureSelector<userReducer.State>('users');

export const selectAllUsers = createSelector(
    selectUserState,
    userReducer.selectAllUsers
);