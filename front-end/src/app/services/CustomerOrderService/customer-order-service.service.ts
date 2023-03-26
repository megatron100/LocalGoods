import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_PATH, Customer_Orders} from "../../shared/constants/constants";

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderServiceService {

  constructor(private http: HttpClient) { }

  getOrders(){
    return this.http.get<any>(`${API_PATH}/order/${Customer_Orders}`).pipe()

  }
}
