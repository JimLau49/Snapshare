import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {return this.loginForm.controls}

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid){
      return 
    }
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe(
        (data:any) =>{
          this.router.navigate(['/home'])
        },
        (error:any) => {
          this.loading = false;
        });
  }
}
