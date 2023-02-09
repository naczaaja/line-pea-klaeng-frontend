import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData, UserDataResponse } from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpChient: HttpClient) { }

  addUserDataRegister(userData: UserData): Observable<UserDataResponse> {
    return this.httpChient.post<UserDataResponse>(`${environment.baseURL}user`, this.makeFormData(userData), {
      reportProgress: true
    })
  }

  makeFormData(userData: UserData): FormData {
    const formData = new FormData()
    formData.append('lineId', userData.lineId)
    formData.append('imageAvatar', userData.imageAvatar)
    formData.append('idCard', userData.idCard.toString())

    return formData
  }
}
