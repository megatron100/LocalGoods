import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH, Customer_Orders } from '../../shared/constants/constants';
import { Order, ResponseData } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class CustomerOrderServiceService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<ResponseData<Order[]>>(
      `${API_PATH}/order/${Customer_Orders}`
    );
  }
}
