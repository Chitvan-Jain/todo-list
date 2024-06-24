import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  tasks: any[] = [];

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    const username = this.authService.getLoggedInUsername();
    if (username) {
      this.taskService.getTasksForUser(username).subscribe(tasks => {
        this.tasks = tasks;
      });
    }
  }
}
