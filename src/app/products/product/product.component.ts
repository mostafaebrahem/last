import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() card:any=[];
  @Input() added!:boolean[];
  @Output() item = new EventEmitter();
  isAddToChart:boolean=false;
  @Input() addCheck:0|1|2=0;

  amount:number=0;
  constructor() {

   }

  ngOnInit(): void {

  }
 add(){
  this.item.emit({item:this.card,quantity:this.amount})
 }




}
