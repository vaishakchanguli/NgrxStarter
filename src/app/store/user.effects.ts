import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadData, loadDataSuccess, loadDataFailure } from './user.actions';
import { of, switchMap, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private http: HttpClient) { }

    loadData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadData),
            switchMap(() =>
                this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
                    map(data => loadDataSuccess({ payload: data })),
                    catchError(error => of(loadDataFailure({ payload: error })))
                )
            )
        )
    );


}