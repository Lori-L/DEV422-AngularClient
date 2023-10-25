import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private userApiService: UserApiService) {}

  username: string = '';
  password: string = '';

  Login() {
    if (!this.username || !this.password) {
      return console.log('empty inputs');
    }

    this.userApiService.getUserData(this.username).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {}
}
