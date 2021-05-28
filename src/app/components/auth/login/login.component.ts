import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {TokenService} from '../../../services/token.service';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private notificationService: NotificationService,
    private router: Router,
    private formBuilder: FormBuilder) {
    if (this.tokenService.getUser()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    this.authService.loginUser({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      console.log(data);
      this.tokenService.saveToken(data.token);
      this.tokenService.saveUser(data);
      this.notificationService.showSnackBar('Successfully logged in.');
      this.router.navigate(['/']);
      window.location.reload();
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
