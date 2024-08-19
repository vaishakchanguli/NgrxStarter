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
            map(payload => payload),
            tap((payload) => { console.log('payload is', payload) }),
            switchMap((payload: any) =>
                this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
                    map((data: any) => {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].id === payload.id) {
                                data[i] = payload;
                                break;
                            }
                        }
                        return updateDataSuccess({ payload: data })
                    }),
                    catchError(error => of(updateDataFailure({ payload: error })))
                )
            )
        )
    );


}