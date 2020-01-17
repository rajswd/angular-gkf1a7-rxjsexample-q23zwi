import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";
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
 
  public subj1$ = new ReplaySubject<number>(3);
  public subj2$ = new ReplaySubject<number>(2);

  // public subj1$ = new BehaviorSubject<number>(30);
  // public subj2$ = new BehaviorSubject<number>(20);

  // public subj1$ = new Subject<number>();
  // public subj2$ = new Subject<number>();

  constructor() {    
         this.triggerSubscriber();
   }

   subjectSubscribe(){
     return this.subj1$.asObservable();
   }

   triggerSubscriber(intervalDuration:number = 1000){    
      
    this.model.interval_1 = this.model.interval_1 = setInterval(()=>{
        this.subj1$.next(++this.model.increment);
        if(this.model.increment == 5){
          this.stopInterval(this.model.interval_1,"increment");
        }
      },intervalDuration);
    this.model.interval_2 = this.model.interval_2 = setInterval(()=>{
      this.subj2$.next(this.model.counter);
      if(this.model.counter == 500){
        
        this.stopInterval(this.model.interval_2,"counter");
      }else{
        this.model.counter += 100;
      }
    },intervalDuration+1500);
   }

   stopInterval(id,type:string){
     clearInterval(id); 
     this.model[type] = 0;
   }
   stopAllInterval(){
     this.model.increment = 0;
     this.model.counter = 0;
     clearInterval(this.model.interval_1);
     clearInterval(this.model.interval_2);
   }
   ngOnDestroy(){
     this.stopAllInterval();
   }
}


// @Injectable()
// export class MyService {
//   makeRequest(value: string, delayDuration: number) {
//     // simulate http request
//     return of(`Complete: ${value}`).pipe(
//       delay(delayDuration)
//     );
//   }
// }