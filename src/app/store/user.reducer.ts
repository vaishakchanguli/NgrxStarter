import { createReducer, on } from '@ngrx/store';
import {
    loadData, loadDataSuccess,
    loadDataFailure,
    updateData,
    updateDataFailure,
    updateDataSuccess
} from './user.actions';

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
    }),
    on(updateData, (state, { payload }) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(updateDataSuccess, (state, { payload }) => {
        return {
            ...state,
            loading: false,
            data: state.data.map((data: any) => {
                if (data.id === payload.id) {
                    return payload;
                }
                return data;
            })
        };
    }),
    on(updateDataFailure, (state, { payload }) => {
        return {
            ...state,
            loading: false,
            error: payload
        };
    }),
);