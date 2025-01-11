import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginObj: any={
  email:'',
  password:''
};

router=inject(Router)

OnLogin(){
  if(this.loginObj.email == 'admin@gmail.com' && this.loginObj.password == 'Welcome@123'){
    this.router.navigateByUrl('/layout/client-project');
    localStorage.setItem('empUser',this.loginObj.email);
  }else{
    alert("Invalid Credential");
  }
}

}
