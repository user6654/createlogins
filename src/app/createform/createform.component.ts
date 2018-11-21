import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { Router } from "@angular/router";

import { FormActionsService } from "../form-actions.service";

@Component({
  selector: "app-createform",
  templateUrl: "./createform.component.html",
  styleUrls: ["./createform.component.scss"]
})
export class CreateformComponent implements OnInit {
  enableOnRetypedPass=false;
  public users = [];
  public submittedForm: FormGroup;
  public dummyConfirmationMessage = "";
  confirmPassword = null;

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
    if (this.submittedForm.value.password === this.submittedForm.value.confirmPassword){
      this.enableOnRetypedPass=true;
    } else return this.enableOnRetypedPass=false;
  }

  private submitForm() {
    this.submittedForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
      // confirmPassword: new FormControl("", ),
    });
  }

  public onSubmit() {
    const user = this.submittedForm.value;

    console.log (this.users);

    this.findUser(user);
    this.gotoLogin();
  }

  //

  // get isPasswordConfirm() {

  // }

  public findUser(user) {
    this.users.some(userFromArr => {
      if (
        userFromArr.username === user.username &&
        userFromArr.password === user.password
      ) {
        this.dummyConfirmationMessage = "Duplicate user detected!";
        return true;
      } else {
        console.log(`user.username: ${user.username}`);
        this.dummyConfirmationMessage = "Unique user registered!";
        this.formService.addUser(
          this.submittedForm.value.username,
          this.submittedForm.value.password
        );
      }
    });
  }

  gotoLogin() {
    this.router.navigate(["/login", {}]);
  }
}

/*

~  clean buttons
~  confirm password
~  register button reroutes sign in

*/
