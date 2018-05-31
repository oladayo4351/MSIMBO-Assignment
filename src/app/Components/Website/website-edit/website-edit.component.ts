import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Website } from '../../../models/website.model.client'
import { WebsiteService } from '../../../services/website.service.client'  
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms' 
@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
uid: string;
websites: Website[];
website: Website;
wid: string;
name: string;
description: string;

  constructor(private activatedRoute : ActivatedRoute, private websiteService: WebsiteService, private router: Router ) { }

@ViewChild('f') websiteForm: NgForm 

  ngOnInit() {
this.activatedRoute.params.subscribe(
	params=>{
		this.uid = params['uid'];
    this.wid = params['wid'];
	  this.websites = this.websiteService.findWebsiteByUser(this.uid);
	  this.website = this.websiteService.findWebsiteById(this.wid);
    this.name = this.website.name;
    this.description = this.website.description
	})

  }

delete(){
  this.websiteService.deleteWebsite(this.wid);
  this.router.navigate(['/user/', this.uid, 'website'])
}

update(){
  this.name = this.websiteForm.value.name
  this.description = this.websiteForm.value.description

  const newWebsite: Website ={
    _id:this.wid,
    name: this.name, 
    developerId: this.uid,
    description: this.description

  }
this.websiteService.updateWebsite(this.wid, newWebsite);
this.router.navigate(['/user/', this.uid, 'website'])

}

}
