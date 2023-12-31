import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';
import { SignUpUser } from '../model/signupuser';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class SignupComponent implements OnInit {
  m: string = 'm';
  f: string = 'f';
  signupForm: FormGroup;
  roles!: Role[];
  signupUser!: SignUpUser;
  responseData!: any;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)]],
      passwordConfirm: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.roleService.findAllRoles().subscribe(data => {
      this.roles = data;
    });
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get mobileNumber() { return this.signupForm.get('mobileNumber'); }
  get dob() { return this.signupForm.get('dob'); }
  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get role() { return this.signupForm.get('role'); }
  get gender() { return this.signupForm.get('gender'); }
  get passwordConfirm() { return this.signupForm.get('passwordConfirm'); }


  SignUp() {
    const checkdob = this.signupForm.get('dob')!.value;
    const checkdob1 = new Date(checkdob);
    const password1  = this.signupForm.get('password')!.value;
    const passwordCnfrm = this.signupForm.get('passwordConfirm')!.value;
    const today = new Date();
    const age = today.getFullYear() - checkdob1.getFullYear();
    if(password1 !== passwordCnfrm){
      alert('Password Does not Match');
    }else if (age < 18) {
      alert('You must be at least 18 years old to submit this form.');
    }else {
      const {
        email,
        password,
        mobileNumber,
        dob,
        firstName,
        lastName,
        role,
        gender,
        passwordConfirm
      } = this.signupForm.value;
      
      const datePipe = new DatePipe('en-US');
      let formattedDate = datePipe.transform(dob, 'yyyy-MM-dd')?? '';
  
      this.signupUser = {
        email,
        password,
        mobileNo: mobileNumber,
        dob: formattedDate,
        firstName,
        lastName,
        role,
        gender,
        passwordConfirm,
        id: 0
      };

      this.userService.signUp(this.signupUser).subscribe(
        data => {
          this.responseData = data;
          if(this.responseData.data == null){
          const message = this.responseData.message.split(';');

          this.snackBar.open( message, 'Ok', {
            panelClass: 'my-custom-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 5000
          });
        }else {
          this.snackBar.open( this.responseData.message , 'Ok', {
            panelClass: 'my-custom-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 5000
          });
          this.router.navigate(['/login']);
        }
        }
        
      );
    }
  }
}
