import { Injectable } from "@angular/core";
import { Widget } from "../models/widget.model.client";
import { map } from "rxjs/operators";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";
// injecting service into module
@Injectable()
export class WidgetService {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) {}

  createWidget(pageId: string, widget: Widget) {
    const url = this.baseUrl + "/api/page/" + pageId + "/widget";
    return this.http.post(url, widget).pipe(
      map((response: Response) => {
        return response.json();
      })
    );
  }

  findWidgetByPageId(pageId: string) {
    const url = this.baseUrl + "/api/page/" + pageId + "/widget";
    return this.http.get(url).pipe(
      map((response: Response) => {
        return response.json();
      })
    );
  }

  findWidgetById(widgetId: string) {
    const url = this.baseUrl + "/api/widget/" + widgetId;
    return this.http.get(url).pipe(
      map((response: Response) => {
        return response.json();
      })
    );
  }

  updateWidget(widgetId: string, widget: Widget) {
    const url = this.baseUrl + "/api/widget/" + widgetId;
    return this.http.put(url, widget).pipe(
      map((response: Response) => {
        return response.json();
      })
    );
  }
  deleteWidget(widgetId: string) {
    const url = this.baseUrl + "/api/widget/" + widgetId;
    return this.http.delete(url).pipe(
      map((response: Response) => {
        return response.json();
      })
    );
  }
}
