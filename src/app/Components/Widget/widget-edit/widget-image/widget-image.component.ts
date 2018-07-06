import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { WidgetService } from '../../../../services/widget.service.client'
import { Widget } from '../../../../models/widget.model.client'
import { NgForm } from '@angular/forms'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
uid:string;
wid: string;
pid:string;
wgid: string;
_id: string;
widgetType: string;
pageId: string;
size?: number;
text?: string;
width?: string;
url?: string;
name?: string;

baseUrl: string;

 widget: Widget ={
 	widgetType:'',
 	pageId:''
 };
 
 @ViewChild('f') widgetForm: NgForm


 constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params =>{
  		this.uid = params['uid']
  		this.wid = params['wid']
  		this.pid = params['pid']
  		this.wgid = params['wgid'] 
  		this.baseUrl = environment.baseUrl;
  		this.widgetService.findWidgetById(this.wgid).subscribe(
  			(widget:Widget)=>{
  				this.widget = widget
  			})
  		
  	})
  }

update(){
	this.name = this.widgetForm.value.name
	this.url = this.widgetForm.value.url
	this.text = this.widgetForm.value.text
	this.width = this.widgetForm.value.width
	const updateWidget: Widget = {
		 _id: this.wgid,
		widgetType: this.widget.widgetType,
		pageId: this.pid,
		url: this.url,
		width:this.width,
		text: this.text,
		name: this.name
	}

this.widgetService.updateWidget(this.wgid, updateWidget).subscribe(
	(widget:Widget)=>{
this.router.navigate(['/user', this.uid,'website',this.wid,'page',this.pid,'widget'])
})
}


delete(){
	this.widgetService.deleteWidget(this.wgid).subscribe(
		(widgets:Widget[])=>{
	this.router.navigate(['/user', this.uid,'website',this.wid,'page',this.pid,'widget'])
})
}
}