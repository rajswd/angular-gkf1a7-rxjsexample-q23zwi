import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @Input()  model:modelClass;//secondData
  @Input() isVisible:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}

export interface modelClass{
  firstData:Array<number>;
  secondData:Array<number>;
}