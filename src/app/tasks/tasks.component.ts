import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  isHidden: boolean = true;
  filteredTasks: any[] = [];
  first: boolean = true;
  second: boolean = true;
  third: boolean = false;
  fourth: boolean = false;

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
        this.filterTasks(this.first)
      });
    }

  }

  filterTasks(first: boolean) {
    if (first) {
      this.filteredTasks = this.tasks.filter(task => task.status === 'To-do');
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === 'Completed');
    }
  }

  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

  toggletoggle() {
    this.first = !this.first;
    this.second = !this.second;
    this.third = !this.third;
    this.fourth = !this.fourth;

    this.filterTasks(this.first)

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
      this.filterTasks(this.first)
    });
  }

  markAsComplete(taskId: number): void {
    this.taskService.updateTaskStatus(taskId, 'Completed').subscribe(() => {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = 'Completed';
      }
      this.filterTasks(this.first)
    });
  }
}
