import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[User] Fetching');
export const loadDataSuccess = createAction('[Task] Fetch Success', props<{ payload: any }>());
export const loadDataFailure = createAction('[Task] Fetch Failure', props<{ payload: any }>());