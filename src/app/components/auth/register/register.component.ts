import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    protected notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  submit(): void {
    this.authService.registerUser({
      email: this.registerForm.value.email,
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
      surname: this.registerForm.value.surname,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar(data.message);
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
