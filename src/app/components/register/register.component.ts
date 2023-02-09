import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/user-data';
import { NetworkService } from 'src/app/services/network.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  lineId = "xxxxx"
  imageAvatar = 'https://pbs.twimg.com/media/DWYCS_6X0AY3ZqL.jpg'

  constructor(private networkService: NetworkService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(userdataForm: NgForm) {

    if (userdataForm.invalid) {
      return;
    }

    const values = userdataForm.value
    let userData: UserData = {
      lineId: this.lineId,
      imageAvatar: this.imageAvatar,
      idCard: values.idCard
    }
    // alert(JSON.stringify(userData))

    this.networkService.addUserDataRegister(userData).subscribe({
      next: data => {
        console.log('welcome to PEA-KLAENG member')
        this.router.navigate(['/welcome'])
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }

}
