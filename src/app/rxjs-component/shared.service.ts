import { Injectable, OnDestroy } from '@angular/core';

import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable({
  providedIn:"root"
})
export class SharedService implements OnDestroy {

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

   triggerSubscriber(intervalDuration:number = 1000){    
      
    this.model.interval_1 = this.model.interval_1 = setInterval(()=>{
        this.subj1$.next(++this.model.increment);
        if(this.model.increment == 5){
          this.model.increment = 0;
          this.stopInterval(this.model.interval_1);
        }
      },intervalDuration);
    this.model.interval_2 = this.model.interval_2 = setInterval(()=>{
      this.subj2$.next(this.model.counter);
      if(this.model.counter == 500){
        this.model.counter = 0;
        this.stopInterval(this.model.interval_2);
      }else{
        this.model.counter += 100;
      }
    },intervalDuration+2000);
   }

   stopInterval(id){
     clearInterval(id); 
   }
   stopAllInterval(){
     clearInterval(this.model.interval_1);
     clearInterval(this.model.interval_2);
   }
   ngOnDestroy(){
     this.stopAllInterval();
   }
}