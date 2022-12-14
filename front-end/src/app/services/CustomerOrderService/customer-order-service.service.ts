import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   API_PATH_SELLER, ORDER_CONFIRM_PATH, API_PATH, API, Customer_Orders } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderServiceService {

  constructor(private http: HttpClient) { }

  getorders(){
    return this.http.get<any>(`${API}${API_PATH}/order/${Customer_Orders}`).pipe()
  
  }
}
