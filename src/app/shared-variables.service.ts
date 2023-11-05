import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedVariablesService {
  showMenu: boolean = false;
  username: string | null = null;

  setSharedData(show: boolean, username: string | null) {
    this.showMenu = show;
    this.username = username;
  }

  constructor() {}
}
