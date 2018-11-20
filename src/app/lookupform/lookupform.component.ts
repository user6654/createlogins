import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { FormActionsService } from "../form-actions.service";

@Component({
  selector: "app-lookupform",
  templateUrl: "./lookupform.component.html",
  styleUrls: ["./lookupform.component.scss"]
})
export class LookupformComponent implements OnInit {
  // @Input() users;
  public userLoginForm : FormGroup;
  public lookupMessage: string = null;
  public users = [];
  //password = [];


  formService: FormActionsService;

  constructor(formService: FormActionsService, private fb: FormBuilder) {

    this.formService = formService;
    this.users = this.formService.getUsers;

  }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.userLoginForm = this.fb.group({
      username : new FormControl(''),
      password: new FormControl('')
    })
  }

  public onSubmit(){
    const user = this.userLoginForm.value
    this.findUser(user)
  }

  public findUser(user) {
    this.users.some(userFromArr => {
      if (userFromArr.username === user.username && userFromArr.password === user.password) {
        this.lookupMessage = "Username and Password accepted!";
        return true
      } else {
        console.log(`user.username: ${user.username}`);
        this.lookupMessage = "Invalid Username and Password.";
      }
    })
  }
}

//Target : put back validation

/*
Object.users
*/
