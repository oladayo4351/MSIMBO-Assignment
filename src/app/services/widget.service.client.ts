import { Injectable } from '@angular/core';
import { Widget } from '../models/widget.model.client'
import { map } from 'rxjs/operators'
import {Http, Response} from '@angular/http';
import { environment } from '../../environments/environment'
// injecting service into module
@Injectable()

export class WidgetService {

baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

widgets: Widget[] = 
[
  { _id: "123",  widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
  { _id: "234",  widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
  { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "https://www.w3schools.com/w3css/img_lights.jpg"},
  { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
  { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
  { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E" },
  { _id: "789",  widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
];



  createWidget(pageId:string, widget:Widget) {
      const url = this.baseUrl + '/api/page/' + pageId +'/widget';
    return this.http.post(url, widget).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
  
  }

  findWidgetByPageId(pageId: string) {
    const url = this.baseUrl + '/api/page/' + pageId +'/widget';
    return this.http.get(url).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
  
  }

  findWidgetById(widgetId: string) {

   const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
  }

  updateWidget(widgetId:string, widget:Widget) { 
   const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.put(url,widget).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))

   }
  deleteWidget(widgetId:string) {  
   const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
}

//   postWidget(widgetId:string, widget:Widget) {  
//    const url = this.baseUrl + '/api/user/:uid/website/:wid/page/:pid/widget/'+widgetId+'/upload;
//     return this.http.post(url,widget).pipe(map(
//       (response: Response) => {
//         return response.json();
//       }

//       ))
// }

}