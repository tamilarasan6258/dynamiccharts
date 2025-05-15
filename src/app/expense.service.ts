import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExpenseData {
  month: string;
  shopping: number;
  food: number;
  travel: number;
  others: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'https://chartsapi.runasp.net/api/Expenses'; // Change to match your actual backend URL

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<ExpenseData[]> {
    return this.http.get<ExpenseData[]>(this.apiUrl);
  }
}
