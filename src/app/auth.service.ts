import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'http://localhost:3000/users';
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('username', user.username);
          }
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('username');
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('username') !== null;
    }
    return false;
  }

  getLoggedInUsername(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('username');
    }
    return null;
  }
}
