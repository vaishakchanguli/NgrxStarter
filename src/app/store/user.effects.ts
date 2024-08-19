import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadData, loadDataSuccess, loadDataFailure, updateData, updateDataSuccess, updateDataFailure } from './user.actions';
import { of, switchMap, catchError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateData),
            //map(({payload, beforeUpdate}) => {payload, beforeUpdate}),
            tap((payload)=>{console.log('tap',payload)}),
            switchMap((data: any) =>
                this.http.patch(`https://jsonplaceholder.typicode.com/users/${data.beforeUpdate.id}`, data.payload).pipe(
                    tap((response)=>{console.log(response)}),
                    map((response: any) => updateDataSuccess({ payload: response , beforeUpdate: data.beforeUpdate})),
                    catchError(error => of(updateDataFailure({ payload: error })))
                )
            )
        )
    );


}