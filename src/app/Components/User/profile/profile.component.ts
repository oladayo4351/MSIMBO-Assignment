import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService} from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

uid:string;
username: string='1';
email: string = '1';
firstName: string= '1';
lastName: string = '1';
oldUsername: string; 
usernameTaken: boolean;
submitSuccess: boolean;
user: User ={
	_id: '',
	username:'',
	password:'',
	firstName:'',
	lastName:'',
	email: ''
};

aUser:User


  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {} 

@ViewChild('f') profileForm : NgForm; 

  ngOnInit() {

this.activatedRoute.params.subscribe(
	params =>{
		this.uid =params['uid'];
	this.userService.findUserById(this.uid).subscribe(
			(user:User) => {
		this.user = user; 
		this.username = user.username;
		this.email = user.email;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.oldUsername = user.username;

			});
		
	})
  
}
 update(){
 	this.username = this.profileForm.value.username
 	this.email = this.profileForm.value.email
	this.lastName = this.profileForm.value.firstName
	this.firstName = this.profileForm.value.lastName

	
	 this.userService.findUserByUsername(this.username).subscribe(
	 	(user: User)=> {
	 	this.aUser = user
	 	}, 

	 	);

	 if(this.aUser && this.oldUsername !==this.username){
	 	 this.usernameTaken = true;
        this.submitSuccess = false;
    }else{
	 		const updateUser : User ={
 			_id : this.user._id,
 			username: this.username,
 			password: this.user.password,
			firstName:this.firstName,
			lastName: this.lastName,
			email: this.email 



	 	};
	 
		this.userService.updateUser(this.uid,updateUser).subscribe(
			(user2: User)=>{
		this.usernameTaken = false;
		this.submitSuccess = true;
			});
	 }
	 
 	
 		
	// }else {
	// 	const updateUser : User ={
 // 			_id : this.user._id,
 // 			username: this.username,
 // 			password: this.user.password,
	// 		firstName:this.firstName,
	// 		lastName: this.lastName,
	// 		email: this.email 
	// 	}
		
	// 	this.usernameTaken = false;
	// 	this.submitSuccess = true;
	// 	this.userService.updateUser(this.uid,updateUser);

 // 	}
 }
}
