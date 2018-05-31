import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Page } from '../../../models/page.model.client'
import { PageService } from '../../../services/page.service.client'
@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
uid:string;
wid:string;
pid: string;
page: Page;
name: string;
description: string;


  @ViewChild('f') pageForm: NgForm;  
  constructor(private activatedRoute: ActivatedRoute, private pageService: PageService, private router: Router) { }

  ngOnInit( ) {
this.activatedRoute.params.subscribe(params =>{
	this.uid = params['uid'];
	this.wid = params['wid'];
	this.pid = params['pid'];
	this.page = this.pageService.findPageById(this.pid);
	

})
  }

delete(){
	this.pageService.deletePage(this.pid)
	this.router.navigate(['/user',this.uid,'website',this.wid,'page'])
}
update(){
	this.name = this.pageForm.value.name
	this.description = this.pageForm.value.description
const newPage: Page ={
	_id: this.uid,
	name: this.name,
	websiteId: this.wid,
	description: this.description

} 
this.pageService.updatePage(this.pid, newPage)
	this.router.navigate(['/user',this.uid,'website',this.wid,'page'])
}
}
