import { Injectable, OnInit } from '@angular/core';

import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable({
  providedIn:"root"
})
export class SharedService {

  model = {    
    interval_1: null,
    interval_2: null,
    increment:0,
    counter: 100,
  };

  public subj1$ = new Subject<number>();
  public subj2$ = new Subject<number>();

  constructor() {    
        this.triggerSubscriber();
   }

   triggerSubscriber(){    
      
      let interval = this.model.interval_1 = setInterval(()=>{
        this.subj1$.next(++this.model.increment);
        if(this.model.increment == 5){
          this.model.increment = 0;
          clearInterval(interval);
        }
      },1000);
    let interval2 = this.model.interval_2 = setInterval(()=>{
      this.subj2$.next(this.model.counter);
      if(this.model.counter == 500){
        this.model.counter = 0;
        clearInterval(interval2);
      }else{
        this.model.counter += 100;
      }
    },10000);
   }
}