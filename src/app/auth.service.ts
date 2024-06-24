import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem('username', user.username); // Save the username instead of userId
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  getLoggedInUsername(): string | null {
    return localStorage.getItem('username');
  }
}
