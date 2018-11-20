import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormActionsService {
  public lookupMessage : string = null;

  public users = [
    { username: 'Admin' , password: 'abc123' },
    { username: 'Assistant' , password: 'qwe123' }
  ];

  constructor() { }

  get getUsers() {
      return this.users
  }

  addUser(name, password) {
    const newUser= {username: name, password: password};
    this.users.push(newUser);
  }
}
