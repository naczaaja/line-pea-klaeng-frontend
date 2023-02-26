import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientDataRegister } from 'src/app/models/client-data-register';
import { NetworkService } from 'src/app/services/network.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  lineId = "dummy_line_UUID"
  imageAvatar = 'assets/user-register-page.png'

  constructor(private networkService: NetworkService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(userdataForm: NgForm) {

    const values = userdataForm.value

    if (userdataForm.invalid && values.passwordPea !== 672685672685) {
      return;
    }

    let clientDataRegister: ClientDataRegister = {
      lineId: this.lineId,
      imageAvatar: this.imageAvatar,
      idCard: values.idCard
    }
    // alert(JSON.stringify(userData))

    this.networkService.addUserDataRegister(clientDataRegister).subscribe({
      next: data => {
        console.log('client data is created to db.')
        this.router.navigate(['/welcome'])
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }

}
