import { CornerstoneDirective } from "./../../../projects/dicom-viewer/src/lib/cornerstone.directive";
import { Url } from "url";
import { viewDicom } from "./../../service/viewDicom.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
} from "@angular/core";
import * as cornerstone from "cornerstone-core";
import { DICOMViewerComponent } from "ng-dicomviewer";
import { UploadFileService } from "src/service/UploadFileService.service";
import {
  Router,
  NavigationStart,
  ParamMap,
  ActivatedRoute,
} from "@angular/router";
import { ConstServer } from "src/service/const.service";
import { Cloud } from "src/service/cloud.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// Cornerstone Libraries
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import { url } from "inspector";
import { Subscription } from "rxjs";

declare const cornerstone;
declare const cornerstoneWADOImageLoader;
@Component({
  selector: "app-dcm-display",
  templateUrl: "./dcm-display.component.html",
  styleUrls: ["./dcm-display.component.css"],
})
export class DcmDisplayComponent implements OnInit {
  url2 =
    " https://firebasestorage.googleapis.com/v0/b/angular-datebase.appspot.com/o/med2%40gmail.com%2Fvz0mq5z81jf.dcm?alt=media&token=31c319fd-3bbd-4246-9984-39bc862a4452";
  f: Blob;
  // @Input() a: any;

  username: any;
  imageList: any[];
  rowIndexArray: any[];
  email: any;
  image: any;
  numberOfImage: any;
  List2: any[];
  List: any[];
  users: any[];
  imageUser: any;
  imaged: any;
  params: ParamMap;
  url3: any;
  s: Subscription;
  s2: Worker;

  @ViewChild(DICOMViewerComponent, { static: true })
  viewPort: DICOMViewerComponent;
  user1: any;

  constructor(
    private service: UploadFileService,
    private getService: UploadFileService,
    private router: Router,
    private user: ConstServer,
    private userServiceDicom: Cloud,
    private http: HttpClient,
    private dicom: viewDicom,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (localStorage.getItem("load") === "reload") {
      window.location.reload();
      localStorage.setItem("load", "no");
    }
    // this.route.params.subscribe((params) => {
    //   const data = this.route.params["a"];
    //   console.log(data);
    // });
    this.user1 = this.route.snapshot.queryParams["a"];
    console.log(this.user1);
    let mock = localStorage.getItem("a");
    console.log(mock);
    this.getService.getImageDetailList();
    this.username = this.user.getUsername();
    console.log(this.email);
    let emailUser: string;

    emailUser = localStorage.getItem("user");
    this.users = this.userServiceDicom.getUserDicom(emailUser);
    console.log(this.users);
    this.email = this.users[1];
    this.imageUser = this.users[2];

    this.List = this.userServiceDicom.getListDicom(emailUser);
    this.numberOfImage = this.List.length;

    console.log(this.List);
    console.log(this.image);

    this.http.get(mock, { responseType: "blob" }).subscribe((res) => {
      console.log(mock);
      console.log(res);
      let files: any[] = [];
      files.push(res);
      console.log(res);
      console.log(files.length);

      if (files && files.length > 0) {
        let imageList = [];
        const fileList: Array<File> = Array.from(files);
        console.log(fileList);
        fileList.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

        // loop thru the File list and build a list of wadouri imageIds (dicomfile:)
        for (let i = 0; i < fileList.length; i++) {
          const dicomFile: File = fileList[i];
          console.log(dicomFile);
          const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(
            dicomFile
          );
          console.log(imageId);
          imageList.push(imageId);
          console.log(imageList);
        }

        // now load all Images, using their wadouri
        this.viewPort.loadStudyImages(imageList);
        this.viewPort.resetAllTools();

        cornerstoneWADOImageLoader.wadouri.fileManager.purge();

        cornerstoneWADOImageLoader.webWorkerManager.initialize({
          webWorkerPath:
            "./assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js",
          taskConfiguration: {
            decodeTask: {
              codecsPath: "../codecs/cornerstoneWADOImageLoaderCodecs.js",
            },
          },
        });
      } else alert("not sure.");
    });
    // this.dicom.dicomnavigation();
    // setTimeout(() => {
    //   this.router.navigateByUrl("display");
    //   console.log("reload");
    // }, 3000);
  }

  ngOnDestroy(): void {
    if (this.s) {
      this.s.unsubscribe();
      cornerstoneWADOImageLoader.webWorkerManager.terminate();
    } else {
      this.router.navigate(["display"]);
    }
  }
}
