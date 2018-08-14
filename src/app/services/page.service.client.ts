import { Injectable } from '@angular/core';
import { Page } from '../models/page.model.client'
import { map } from 'rxjs/operators'
import {Http, Response} from '@angular/http';
import { environment } from '../../environments/environment'
// injecting service into module
@Injectable()

export class PageService {
  baseUrl = environment.baseUrl;
  constructor(private http: Http) { }



  createPage(websiteId:string, page: Page) {
   const url = this.baseUrl + '/api/website/'+ websiteId +'/page';
    return this.http.post(url, page).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
  
  }

  findPageByWebsiteId(websiteId: string) {
     const url = this.baseUrl + '/api/website/'+websiteId+'/page';
    return this.http.get(url).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
  
  }

  findPageById(pageId: string) {
    const url = this.baseUrl + '/api/page/'+ pageId;
    return this.http.get(url).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
    }
  

  updatePage(pageId:string, page:Page) {
     const url = this.baseUrl + '/api/page/'+ pageId;
    return this.http.put(url,page).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))

  }
  deletePage(pageId:string) {
    const url = this.baseUrl + '/api/page/'+ pageId;
    return this.http.delete(url).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
}
}