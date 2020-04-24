import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() receivedResponse: Response;
  results
  constructor() { }

  ngOnInit() {
    this.results=localStorage.getItem('rsults');
  }
}
