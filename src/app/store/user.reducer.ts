import { createReducer, on } from '@ngrx/store';
import { loadData, loadDataSuccess, loadDataFailure } from './user.actions';

export interface State {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(loadData, state => {
    return {
      ...state,
      loading: true
    };
  }),
  on(loadDataSuccess, (state, { payload }) => {
    console.log({
        ...state,
        loading: false,
        data: payload
      })
    return {
      ...state,
      loading: false,
      data: payload
    };
  }),
  on(loadDataFailure, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  })
);