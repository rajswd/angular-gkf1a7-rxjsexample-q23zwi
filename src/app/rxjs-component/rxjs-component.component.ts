import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class RxjsComponentComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  name = 'RXJS';
  model={
          subject:{
            visibility:true,
            firstData: [],
            secondData: []
          },
          combineLatest:{
            visibility:false,
            firstData: [],
            secondData: []
          }
          
        };
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    Observable.combineLatest(
      this.sharedService.subj1$,
      this.sharedService.subj2$
    ).subscribe(([receiver1, receiver2])=>{
      this.model.combineLatest.firstData.push(receiver2);
      this.model.combineLatest.secondData.push(receiver1);
    });

    this.sharedService.subj1$.subscribe(receiver=>{
      this.model.subject.firstData.push(receiver);
    });

    this.sharedService.subj2$.subscribe(receiver=>{
       this.model.subject.secondData.push(receiver);

    });
  }
  resetList(){
    this.model.subject.firstData =  [] ;
    this.model.subject.secondData =  [] ;
    this.model.combineLatest.firstData =  [] ;
    this.model.combineLatest.secondData =  [] ;
   
  }
  restartTimer(val){
    let value = Number.parseInt(val);
    if(Number.isNaN(value)){
      return;
    }
    this.resetList();
    this.sharedService.stopAllInterval();
    this.sharedService.triggerSubscriber(value*1000);
  }

  ngOnDestroy(){
    // .takeUntil(this.ngUnsubscribe)
    // this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
  }

}