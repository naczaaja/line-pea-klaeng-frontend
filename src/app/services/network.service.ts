import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientDataRegister, ClientDataRegisterResponse } from '../models/client-data-register';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpChient: HttpClient) { }

  addUserDataRegister(userData: ClientDataRegister): Observable<ClientDataRegisterResponse> {
    return this.httpChient.post<ClientDataRegisterResponse>(`${environment.baseURL}client-data-register`, this.makeFormData(userData), {
      reportProgress: true
    })
  }

  makeFormData(clientDataRegister: ClientDataRegister): FormData {
    const formData = new FormData()
    formData.append('lineId', clientDataRegister.lineId)
    formData.append('imageAvatar', clientDataRegister.imageAvatar)
    formData.append('idCard', clientDataRegister.idCard.toString())

    return formData
  }
}
