import { Component } from '@angular/core';
import { AuthService } from '../core/services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username: string;
  public password: string;
  public showSpinner = false;
  public error: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  public login() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['home']),
        err => this.error = 'Could not authenticate'
      );
  }

}
