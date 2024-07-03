import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  isHidden: boolean = true;
  isRemoved: boolean = true;
  statusFilter: string = 'To-do';
  filteredTasks: any[] = [];
  removedTaskID: number | null = null;

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
        this.filterTasks();
      });
    }
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter((task) => task.status === this.statusFilter);
  }

  toggleRemove() {
    this.isRemoved = !this.isRemoved;
  }

  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

  changeStatusFilter(status: string) {
    this.statusFilter = status;
    this.filterTasks();
  }

  addTask() {
    if (this.newTask.title.trim() && this.newTask.status) {
      this.taskService.addTask(this.newTask).subscribe((task) => {
        this.tasks.push(task);
        this.newTask.title = '';
        this.newTask.status = '';
        this.toggleHidden();
        this.filterTasks();
      });
    }
  }

  removeTask(taskId: number): void {
    this.removedTaskID = taskId;
    this.toggleRemove();
  }

  cancelRemove() {
    this.removedTaskID = null;
    this.toggleRemove();
  }

  confirmRemove() {
    if (this.removedTaskID !== null) {
      this.taskService.removeTask(this.removedTaskID).subscribe(() => {
        this.tasks = this.tasks.filter(
          (task) => task.id !== this.removedTaskID
        );
        this.filterTasks();
      });
      this.toggleRemove();
    }
  }

  markAsInProgress(taskId: number): void {
    this.taskService.updateTaskStatus(taskId, 'In-progress').subscribe(() => {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = 'In-progress';
      }
      this.filterTasks();
    });
  }

  markAsComplete(taskId: number): void {
    this.taskService.updateTaskStatus(taskId, 'Completed').subscribe(() => {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = 'Completed';
      }
      this.filterTasks();
    });
  }
}
