import { Injectable } from '@angular/core';
import { Page } from '../models/page.model.client'
// injecting service into module
@Injectable()

export class PageService {

  constructor() { }

pages: Page[] = 
[
  { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
  { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
  { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
];



  createPage(websiteId:string, page: Page) {
    page._id = Math.floor(Math.random()*Math.floor(10000)).toString(); 
    page.websiteId = websiteId;
    this.pages.push(page);
    return page;
  }

  findPageByWebsiteId(websiteId: string) {
    var result = [];
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === websiteId) {
       result.push(this.pages[x]); }
    }return result;
  }

  findPageById(pageId: string) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {  return this.pages[x]; }
    }
  }

  updatePage(pageId:string, page:Page) {
    let oldPage = this.findPageById(pageId);
    var index = this.pages.indexOf(oldPage);

    this.pages[index].name = page.name
    this.pages[index].description = page.description

  }
  deletePage(pageId:string) {
    var oldPage = this.findPageById(pageId);
    var index = this.pages.indexOf(oldPage);
    this.pages.splice(index,1);

   }
}
