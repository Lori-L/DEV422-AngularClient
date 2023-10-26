import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  // login
  Login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/login/', {
      username,
      password,
    });
  }

  SignUp(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/signup/', {
      username,
      password,
    });
  }

  // get user data
  getUserData(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/user/${id}`);
  }

  // create a user
  createUser(data: CreateUserPaylaod): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/', data);
  }

  // delete a user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/user/${id}`);
  }
}

export interface User extends CreateUserPaylaod {
  id: string;
}

export interface CreateUserPaylaod {
  name: string;
  email?: string;
  password: string;
}
