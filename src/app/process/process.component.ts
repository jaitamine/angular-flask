import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Cloud } from './../../service/cloud.service';
import { Log } from 'src/service/log.service';
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  @Input() receivedResponse: Response;
  constructor(private cloud: Cloud, private router: Router, private log: Log) {

  }
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['result']);
    }, 30000)

  }

}
