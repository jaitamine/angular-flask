import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  ngOnInit() {
  }

  constructor(private uploadService: AuthenticationService, router: Router){}


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}

// onSubmit() {
//   const formData = new FormData();
//     formData.append('doc', this.fileData);
//     this.uploadService.saveFile(formData)
//       .subscribe(res => {
//         console.log(res);
//         this.uploadedFilePath = res.data.filePath;
//         alert('SUCCESS !!');
//       })
// }
// }
}
