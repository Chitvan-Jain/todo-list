import { Component,} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onFormSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigateByUrl('/tasks/' + this.username);
      } else {
        alert('Username or password not found.');
      }
    });
  }
}
