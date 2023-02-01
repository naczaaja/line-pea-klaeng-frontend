import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserData } from 'src/app/models/user-data';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  imageAvatar = 'https://pbs.twimg.com/media/DWYCS_6X0AY3ZqL.jpg'
  
  constructor() { }

  ngOnInit(): void {
  }

  prefixes: PrefixName[] = [
    { value: 'นาย', viewValue: 'นาย' },
    { value: 'นาง', viewValue: 'นาง' },
    { value: 'นางสาว', viewValue: 'นางสาว' },
  ];

  onSubmit(userdataForm: NgForm) {

    if (userdataForm.invalid) {
      return;
    }

    const values = userdataForm.value
    let userData: UserData = {
      imageAvatar: this.imageAvatar,
      idCardNumber: values.idCardNumber,
      selectedPrefix: values.selectedPrefix,
      firstname: values.firstname,
      lastname: values.lastname,
      telNumber: values.telNumber
    }
    // alert(JSON.stringify(userData))
    console.log(userData)
  }

}

interface PrefixName {
  value: string;
  viewValue: string;
}
