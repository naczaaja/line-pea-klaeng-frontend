import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  idCardFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  foods: Food[] = [
    {value: 'prefix-0', viewValue: 'นาย'},
    {value: 'prefix-1', viewValue: 'นาง'},
    {value: 'prefix-2', viewValue: 'นางสาว'},
  ];
}

interface Food {
  value: string;
  viewValue: string;
}
