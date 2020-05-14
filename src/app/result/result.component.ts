import { Component, OnInit} from '@angular/core';
import { ResultsService } from 'src/service/results.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
 
  results: any;
  constructor(resultsService: ResultsService) {
    resultsService.getJSONData().subscribe(data=>{
        this.results=data;
        console.log(this.results); //<-- data is here
    });
  }


  ngOnInit() {}
}

