import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../store/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUserById(id: string) {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  addUser(user: User) {
    return this.http.post<User>('http://localhost:3000/users', user);
  }

  updateUser(id: string, user: User) {
    return this.http.put<User>(`http://localhost:3000/users/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<void>(`http://localhost:3000/users/${id}`);
  }
}
