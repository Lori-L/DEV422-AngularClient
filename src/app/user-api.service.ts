import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  // login
  Login(username: string, password: string): Observable<any> {
    return this.http.get(
      `https://dnddbnodeserver.azurewebsites.net/user/password?username=${username}&password=${password}`
    );
  }

  SignUp(username: string, password: string, email: string): Observable<any> {
    return this.http.post('https://dnddbnodeserver.azurewebsites.net/user/signup/', {
      username,
      password,
      email,
    });
  }

  openLogoutDialog(): void {
    this.dialog.open(LogoutDialogComponent);
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
