import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[User] Fetching');
export const loadDataSuccess = createAction('[User] Fetch Success', props<{ payload: any }>());
export const loadDataFailure = createAction('[User] Fetch Failure', props<{ payload: any }>());
export const updateData = createAction('[User] Updating', props<{ payload: any }>());
export const updateDataSuccess = createAction('[User] Update Success', props<{ payload: any }>());
export const updateDataFailure = createAction('[User] Update Failure', props<{ payload: any }>());