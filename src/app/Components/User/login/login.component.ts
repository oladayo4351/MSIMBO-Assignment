import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { UserService } from '../../../services/user.service.client'
import { User } from '../../../models/user.model.client'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

@ViewChild('f') loginForm: NgForm;

//properties 
username: string;
password: string;
errorFlag: boolean;
errorMsg = 'Invaild username or password!';


  constructor(private userService: UserService) {

   }

  ngOnInit() {
  
  }

 login(){
 	this.username = this.loginForm.value.username
	
} 

}
