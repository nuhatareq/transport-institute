
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiMethod } from './api-methods';
import { environment } from '../../../environments/environment';



@Injectable({
    providedIn: 'root',
})
export class ApiService {
    baseUrl: string = environment.apiUrl;
    token : string = environment.authToken

    constructor(public http: HttpClient) {}
    apiCall(path: string, method: string = ApiMethod.GET, data?: any) {
        
        switch (method) {
            case ApiMethod.POST:
                return this.postRequest(path, data);
            case ApiMethod.UPDATE:
                return this.putRequest(path, data);
            case ApiMethod.DELETE:
                if (data) {
                    return this.deleteRequest(path, data);
                } else {
                    return this.noBodyDeleteRequest(path);
                }
            default:
                return this.getRequest(path);
        }
    }

    getRequest(path: string) {
        const headers = new HttpHeaders(
            {
                Authorization: `Bearer ${this.token}`
            }
        )
        return this.http.get(this.baseUrl + path , {headers : headers}).pipe(
            catchError((error) => {
                console.log(error);
                return throwError(() => new Error(error));
            })
        );
    }
    postRequest(path: string, data: any) {
        return this.http.post(this.baseUrl + path, data);
    }
    putRequest(path: string, data: any) {
        return this.http.put(this.baseUrl + path, data);
    }
    patchRequest(path: string, data: any) {
        return this.http.patch(this.baseUrl + path, data);
    }
    deleteRequest(path: string, data: any) {
        return this.http.delete(this.baseUrl + path, { body: data });
    }
    noBodyDeleteRequest(path: string) {
        return this.http.delete(this.baseUrl + path);
    }
}


