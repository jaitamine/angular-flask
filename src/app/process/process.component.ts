import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Cloud } from './../../service/cloud.service';
import { Log } from 'src/service/log.service';
import { ResultsService } from 'src/service/results.service';
import { UploadService } from 'src/service/upload.service';
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  constructor(private cloud: Cloud, private router: Router, private log: Log, private uploadService: UploadService) {

  }
  
  ngOnInit() {
    this.uploadService.getGoData().subscribe(data=>{
      
      console.log(data);
      if(data===true){
      this.router.navigate(['/dashboard']);
      }
  });
  setTimeout(() => {

    console.log("in process");
    
  }, 3000)
    

  }

}
