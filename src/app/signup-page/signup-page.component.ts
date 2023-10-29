import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  userIs: string = '';

  constructor(private userApiService: UserApiService, private router: Router) {}

  ngOnInit(): void {}

  Signup() {
    if (!this.username || !this.password) {
      return console.log('empty inputs');
    }

    this.userApiService
      .SignUp(this.username, this.password, this.email)
      .subscribe((data) => {
        if (data.message == 'true') {
          this.router.navigate(['/choose-view']);
        } else {
          console.log(data.message);
        }
      });
  }
}
