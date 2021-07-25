import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { emp } from './employee/employee.component';
@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {

  constructor(private http:HttpClient) { }
  createemp(data:emp):Observable<emp>
  {
    return this.http.post<emp>("https://localhost:44310/api/empdetails",data);
  } 
  Updateemp(data:emp):Observable<emp>
  {
    return this.http.put<emp>("https://localhost:44310/api/empdetails",data);
  } 
  GetAllemp():Observable<emp[]>
  {
    return this.http.get<emp[]>("https://localhost:44310/api/empdetails");
  }
  GetOneemp(id:any):Observable<emp>
  {
    return this.http.get<emp>("https://localhost:44310/api/empdetails"+"/"+id);
  }
  Deleteemp(id:any):Observable<emp>
  {
    return this.http.delete<emp>("https://localhost:44310/api/empdetails"+"/"+id);
  }
  Deleteall():Observable<emp[]>
  {
    return this.http.delete<emp[]>("https://localhost:44310/api/empdeleteall");
  }
}
