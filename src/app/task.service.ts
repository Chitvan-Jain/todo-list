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
  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.tasksUrl, task);
  }

  removeTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.tasksUrl}/${taskId}`);
  }

  updateTaskStatus(taskId: number, status: string): Observable<any> {
    return this.http.patch<any>(`${this.tasksUrl}/${taskId}`, { status: status });
  }

}
