import { Cloud } from './../../service/cloud.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
result:string;
  @Input() receivedResponse: Response;
  constructor(private cloud:Cloud) {
    
   }
  ngOnInit() {
    
    this.result=localStorage.getItem('results');
    console.log(this.result);
  }


}
