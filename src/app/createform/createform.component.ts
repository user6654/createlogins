import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

// import {delay} from 'rxjs';
import { Router } from "@angular/router";

import { FormActionsService } from "../form-actions.service";

@Component({
  selector: "app-createform",
  templateUrl: "./createform.component.html",
  styleUrls: ["./createform.component.scss"]
})
export class CreateformComponent implements OnInit {

  public users = [];
  public submittedForm: FormGroup;
  public dummyConfirmationMessage = "";

  formService: FormActionsService;

  constructor(
    formService: FormActionsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formService = formService;
    this.users = this.formService.getUsers;
  }

  ngOnInit() {
    this.submitForm();

  }

  private submitForm() {
    console.log("here");
    this.submittedForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", ),
    });
    /*isPasswordConfirm();*/


  }

  public onSubmit() {
    const user = this.submittedForm.value;

    console.log (this.users);

    this.findUser(user);
  }



  //
/*
    public isPasswordConfirm() {

    }*/


  public findUser(user) {
    this.users.some(userFromArr => {
      if (
        userFromArr.username === user.username &&
        userFromArr.password === user.password
      ) {
        this.dummyConfirmationMessage = "User name exits. Register a different name.";
        return true;
      } else {
        console.log(`user.username: ${user.username}`);
        this.dummyConfirmationMessage = "Unique user registered!";
        this.formService.addUser(
          this.submittedForm.value.username,
          this.submittedForm.value.password
        );
        // delay(1000);
        this.gotoLogin();
      }
    });
  }

  gotoLogin() {
    this.router.navigate(["/login", {}]);
  }

  get password(): string{
    return this.submittedForm.get('password').value
  }
  get confirmPassword():string{
    return this.submittedForm.get('confirmPassword').value
  }
  get disableOnInvalidAndUnconfirmedPass():boolean{
      return (this.submittedForm.valid && this.password === this.confirmPassword)
  }
}

/*

~  clean buttons
~  confirm password
~  register button reroutes sign in

*/
