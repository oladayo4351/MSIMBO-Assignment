import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WidgetService } from "../../../../services/widget.service.client";
import { Widget } from "../../../../models/widget.model.client";
import { NgForm } from "@angular/forms";
import { environment } from "../../../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import * as AWS from "aws-sdk/global";
import * as S3 from "aws-sdk/clients/s3";

//require("aws-sdk/dist/aws-sdk");
@Component({
  selector: "app-widget-image",
  templateUrl: "./widget-image.component.html",
  styleUrls: ["./widget-image.component.css"],
})
export class WidgetImageComponent implements OnInit {
  uid: string;
  wid: string;
  pid: string;
  wgid: string;
  _id: string;
  widgetType: string;
  pageId: string;
  size?: number;
  text?: string;
  width?: string;
  url?: string;
  name?: string;
  Name: string;
  myFile: File;
  baseUrl: string;
  fileUrl: string;

  widget: Widget = {
    widgetType: "",
    pageId: "",
  };

  @ViewChild("f") widgetForm: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private widgetService: WidgetService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.uid = params["uid"];
      this.wid = params["wid"];
      this.pid = params["pid"];
      this.wgid = params["wgid"];
      this.baseUrl = environment.baseUrl;
      this.widgetService
        .findWidgetById(this.wgid)
        .subscribe((widget: Widget) => {
          this.widget = widget;
        });
    });
  }
  fileChange(files: any) {
    let file = files.target.files[0];

    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: "AKIASF6DDRF634TMW4P3",
      secretAccessKey: "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",
      region: "us-west-1",
    });
    const params = {
      Bucket: "web-maker",
      Key: file.name,
      Body: file,
      ACL: "public-read",
      ContentType: contentType,
    };
    var widgetService = this.widgetService.updateWidget.toString();

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log("There was an error uploading your file: ", err);
        return false;
      }
      console.log("Successfully uploaded file.", data);
      this.fileUrl = data.Location;

      return true;
    });
    //for upload progress
    // bucket
    //   .upload(params)
    //   .on("httpUploadProgress", function (evt) {
    //     console.log(evt.loaded + " of " + evt.total + " Bytes");
    //   })
    //   .send(function (err, data) {
    //     if (err) {
    //       console.log("There was an error uploading your file: ", err);
    //       return false;
    //     }
    //     console.log("Successfully uploaded file.", data);
    //     this.fileUrl = data.Location;
    //     console.log(this.fileUrl);
    //     return true;
    //   });
  }

  update(e) {
    let file = e.target[5].files[0];

    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: "AKIASF6DDRF634TMW4P3",
      secretAccessKey: "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",
      region: "us-west-1",
    });
    const params = {
      Bucket: "web-maker",
      Key: file.name,
      Body: file,
      ACL: "public-read",
      ContentType: contentType,
      widgetService: this.widgetService,
      widgetForm: this.widgetForm.value,
      widgetType: this.widget.widgetType,
      uid: this.uid,
      wid: this.wid,
      wgid: this.wgid,
      pid: this.pid,
      pageId: this.pageId,
      newSubmit: this.newSubmit,
      router: this.router,
    };

    // let widgetService = this.widgetService.updateWidget();
    // let widgetForm = this.widgetForm.value;
    var widgetService = this.widgetService.updateWidget.toString();

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log("There was an error uploading your file: ", err);
        return false;
      }
      //  console.log("Successfully uploaded file.", data);

      var fileUrl = data.Location;

      this.name = params.widgetForm.name;
      //this.url = this.widgetForm.value.url;
      this.url = this.fileUrl;
      this.text = params.widgetForm.text;
      this.width = params.widgetForm.width;
      this.widgetType = params.widgetType;
      const updateWidget: Widget = {
        widgetType: this.widgetType,
        pageId: params.pageId,
        url: fileUrl,
        width: this.width,
        text: this.text,
        name: this.name,
      };

      params.newSubmit(params);

      params.widgetService
        .updateWidget(params.wgid, updateWidget)
        .subscribe((widget: Widget) => {});
      return true;
    });
  }

  newSubmit(params) {
    const updateWidget: Widget = {
      _id: params.wgid,
      widgetType: params.widgetType,
      pageId: params.pid,

      width: "",
      text: "",
      name: "",
    };

    params.widgetService
      .updateWidget(params.wgid, updateWidget)
      .subscribe((widget: Widget) => {
        params.router.navigate([
          "/user",
          params.uid,
          "website",
          params.wid,
          "page",
          params.pid,
          "widget",
        ]);
      });
  }

  delete() {
    this.widgetService
      .deleteWidget(this.wgid)
      .subscribe((widgets: Widget[]) => {
        this.router.navigate([
          "/user",
          this.uid,
          "website",
          this.wid,
          "page",
          this.pid,
          "widget",
        ]);
      });
  }
}
