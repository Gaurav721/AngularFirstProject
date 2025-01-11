import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../model/class/Client';
import { APIResponseModel } from '../model/interface/role';
import { Constant } from '../components/constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClients():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL+"GetAllClients")
  }

  getAllClientProject():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL+"GetAllClientProjects")
  }

  getAllEmployee():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL+Constant.API_METHOD.GET_ALL_EMP)

  }

  addUpdateClient(obj:Client):Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.API_URL+"AddUpdateClient",obj)
  }

  addUpdateClientProject(obj:Client):Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.API_URL+"AddUpdateClientProject",obj)
  }

  deleteClientById(id:number):Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(environment.API_URL+"DeleteClientByClientId?clientId="+id)
  }
}
