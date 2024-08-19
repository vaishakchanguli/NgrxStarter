import { createReducer, on } from '@ngrx/store';
import {
    loadData, loadDataSuccess,
    loadDataFailure,
    updateData,
    updateDataFailure,
    updateDataSuccess
} from './user.actions';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface State extends EntityState<User> {
    // additional entity state properties
    data: any;
    loading: boolean;
    error: any;
};

export const initialState: State = adapter.getInitialState({
    data: null,
    loading: false,
    error: null
});

export const userReducer = createReducer(
    initialState,
    on(loadData, state => {
        return adapter.setAll([], state);
        // return {
        //     ...state,
        //     loading: true
        // };
    }),
    on(loadDataSuccess, (state, { payload }) => {
        console.log(payload)
        return adapter.setAll(payload, state);
        // return {
        //     ...state,
        //     loading: false,
        //     data: payload
        // };
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
    on(updateDataSuccess, (state, { payload, beforeUpdate }) => {
        return {
            ...state,
            loading: false,
            data: state.data.map((data: any) => {
                if (data.id === beforeUpdate.id) {
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


// get the selectors
const {
    selectAll
} = adapter.getSelectors();

// select the array of users
export const selectAllUsers = selectAll;
