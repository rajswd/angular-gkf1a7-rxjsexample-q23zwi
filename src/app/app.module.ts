import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RxjsComponentComponent } from './rxjs-component/rxjs-component.component';
import { SharedService } from './rxjs-component/shared.service';
import { ViewComponent } from './rxjs-component/view/view.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, RxjsComponentComponent, ViewComponent ],
  bootstrap:    [ AppComponent ],
  providers: [SharedService]
})
export class AppModule { }
