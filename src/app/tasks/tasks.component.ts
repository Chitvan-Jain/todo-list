import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  isHidden: boolean = true;
  newTask = {
    title: '',
    status: '',
    username: '',
  };

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getLoggedInUsername();
    if (username) {
      this.newTask.username = username;
      this.taskService.getTasksForUser(username).subscribe((tasks) => {
        this.tasks = tasks;
      });
    }
  }

  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

  addTask() {
    if (this.newTask.title.trim() && this.newTask.status) {
      this.taskService.addTask(this.newTask).subscribe((task) => {
        this.tasks.push(task);
        this.newTask.title = '';
        this.newTask.status = '';
        this.toggleHidden(); // Hide the form after adding the task
      });
    }
  }

  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    });
  }

  markAsComplete(taskId: number): void {
    this.taskService
      .updateTask(taskId, { status: 'Completed', completed: true })
      .subscribe(() => {
        const task = this.tasks.find((task) => task.id === taskId);
        if (task) {
          task.status = 'Completed';
          task.completed = true;
        }
      });
  }
}
