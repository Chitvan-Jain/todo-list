import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule , FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private usersUrl = 'http://localhost:3000/users';
  usernameExists = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    const { email, username, password } = form.value;

    this.checkUsernameExists(username).subscribe(exists => {
      if (exists) {
        this.usernameExists = true;
      } else {
        this.usernameExists = false;
        const newUser = { email, username, password };
        this.http.post(this.usersUrl, newUser).subscribe(() => {
          this.router.navigateByUrl('/login');
        });
      }
    });
  }

  checkUsernameExists(username: string) {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => users.some(user => user.username === username))
    );
  }
}

