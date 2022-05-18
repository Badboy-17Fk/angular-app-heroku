import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(formData: any){
    // console.log(formData);
    this.authService.login(formData.email,formData.password);
  }

}
