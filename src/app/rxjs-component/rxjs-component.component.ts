import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/zip";

import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/observable/combineLatest";
import {SharedService} from "./shared.service";

@Component({
  selector: 'app-rxjs-component',
  templateUrl: './rxjs-component.component.html',
  styleUrls: ['./rxjs-component.component.css']
})
export class RxjsComponentComponent implements OnInit {
  name = 'RXJS';
  model={
          firstData: [],
          secondData: []
        };
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    Observable.combineLatest(
      this.sharedService.subj1$,
      this.sharedService.subj2$
    ).subscribe(([receiver1, receiver2])=>{
      this.model.firstData.push(receiver2);
      this.model.secondData.push(receiver1);
    });
    this.sharedService.subj1$.subscribe(receiver=>{
      this.model.firstData.push(receiver);
    });

    this.sharedService.subj2$.subscribe(receiver=>{
       this.model.secondData.push(receiver);

    });


  }

}