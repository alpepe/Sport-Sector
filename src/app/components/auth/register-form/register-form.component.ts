import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../../core/models/register.model';
import { AuthenticationService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  public model: RegisterModel;
  public registeredUser: string;
  public registerSuccess: boolean;
  public registerFail: boolean;

  constructor(
    private authService: AuthenticationService
  ) {
    this.model = new RegisterModel("", "", "", "", "user");
  }

  register(): void {
    this.authService.register(this.model)
      .subscribe(
      data => {
        this.successfulRegister(data);
      },
      err => {
        this.registerFail = true;
      }
      );
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
  }
}
