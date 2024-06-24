import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getTasksForUser(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.tasksUrl}?userId=${username}`);
  }

  // Additional methods to add, update, and delete tasks can be added here
}
