import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

  
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    
    this.authService.register(this.registerForm.value)
      .subscribe(
        (data:any) => {
          this.router.navigate(['/login']);
        },
        (error:any) => {
          this.loading = false;
        });
  }
}