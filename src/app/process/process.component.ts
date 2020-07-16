import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Cloud } from './../../service/cloud.service';
import { Log } from 'src/service/log.service';
import { ResultsService } from 'src/service/results.service';
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  @Input() receivedResponse: Response;
  constructor(private cloud: Cloud, private router: Router, private log: Log, private resultsService: ResultsService) {
  //   resultsService.getJSONData().subscribe(data=>{
  //     let results = data;
  //     // this.fileNames = (data["file_name"]);
  //     // console.log(this.fileNames);

  //     if (results){
  //     console.log(results); //<-- data is here
  //     // this.router.navigate(['dashboard']);
  //     }
  // });
  }
  
  ngOnInit() {
    // setTimeout(() => {
    //   this.router.navigate(['/dashboard']);
    // }, 1000)

  }

}
