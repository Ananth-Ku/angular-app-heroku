import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(),
      dob: new FormControl(),
      gender: new FormControl(),
      qualification: new FormControl(),
      mobileNumber: new FormControl(),
      email: new FormControl(),
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    console.log('onSubmit');
    const userJson = {
      name: this.userForm.controls['name'].value,
      dob: this.userForm.controls['dob'].value,
      gender: this.userForm.controls['gender'].value,
      qualification: this.userForm.controls['qualification'].value,
      mobileNumber: this.userForm.controls['mobileNumber'].value,
      email: this.userForm.controls['email'].value,
    };
    this.userService.addUser(userJson).subscribe((res: any) => {
      if (res !== undefined) {
        console.log(res);
        console.log('user added successfully');
        this.router.navigate(['getUser']);
        this._snackBar.open('Saved Successfully', 'Done');
      }
    });
  }

  clearUserForm() {
    this.userForm.reset();
  }
}
