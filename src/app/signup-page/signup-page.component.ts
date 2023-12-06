import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';
import { SharedVariablesService } from '../shared-variables.service';

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

  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private sharedVariablesService: SharedVariablesService
  ) {}

  ngOnInit(): void {}

  clearInputs() {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  Signup() {
    if (!this.username || !this.password) {
      this.username = '';
      this.password = '';
      return console.log('empty inputs');
    }

    this.userApiService
      .SignUp(this.username, this.password, this.email)
      .subscribe((data) => {
        if (data.message == 'true') {
          localStorage.setItem('userId', JSON.stringify(data._id));
          localStorage.setItem('username', JSON.stringify(this.username));
          this.router.navigate(['/choose-view']);
          this.sharedVariablesService.setSharedData(true, this.username);
        } else {
          console.log(data.message);
          this.clearInputs();
        }
      });
  }
}
