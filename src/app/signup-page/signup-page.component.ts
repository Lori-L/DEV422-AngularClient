import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private userApiService: UserApiService) {}

  ngOnInit(): void {}

  Signup() {
    if (!this.username || !this.password) {
      return console.log('empty inputs');
    }

    this.userApiService
      .SignUp(this.username, this.password)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
