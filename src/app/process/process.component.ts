import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Cloud } from './../../service/cloud.service';
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  ImageString:string;
  @Input() receivedResponse: Response;
  constructor(private cloud:Cloud, private router:Router) {
    
   }
  ngOnInit() {
    this.ImageString=localStorage.getItem('base64');
    console.log(this.ImageString);
    this.cloud.ImageProcessing(this.ImageString);
    setTimeout(() => {
      this.router.navigate(['result']);
  }, 5000);  
  }

}
