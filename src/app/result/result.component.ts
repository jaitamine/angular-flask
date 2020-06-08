import { Router } from '@angular/router';
import { Cloud } from './../../service/cloud.service';
import { Component, OnInit, Input } from '@angular/core';
import { Log } from 'src/service/log.service';
import { ResultsService } from 'src/service/results.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  results:any;
  @Input() receivedResponse: Response;
  constructor(resultsService: ResultsService,private cloud: Cloud, private log: Log,
    private rooter:Router) {
    resultsService.getJSONData().subscribe(data=>{
      this.results=data;
      console.log(this.results); //<-- data is here
  });
  }
  ngOnInit() {

    // this.result = localStorage.getItem('results');
    // console.log(this.result);
    // (error) => {
    //   console.log(error.message);
    //   this.log.logAngular(error.message);
    // };
    // if(this.result==null){
    //   this.result='there is a problem during the cloud response';
    // };
    
   
  }
  goback(){
    this.rooter.navigate(['/dashboard']);
  }



}
