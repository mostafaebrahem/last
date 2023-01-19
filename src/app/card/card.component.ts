import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    chartItems:any[]=[];

    currChartUpdate:any;
    quantities:number[]=[];
    amount!:number;
  constructor(private _SharedService:SharedService) { }

  ngOnInit(): void {
    this.gettingChart();
  }



  addQuantity(){
    this.quantities=[];
    for(let i=0;i<this.chartItems.length;i++){
      this.quantities.push(this.chartItems[i].quantity);

    }
  }
  gettingChart(){
    if('chart' in localStorage){
      this.chartItems=JSON.parse(localStorage.getItem('chart')!);
      console.log(this.chartItems);
      this.addQuantity()
      console.log(this.quantities)
    }
  }
  updates(i:number){

    this.currChartUpdate=this.chartItems[i];
    this.currChartUpdate.quantity=this.quantities[i];

    this.chartItems.splice(i,1);
    this.chartItems.push(this.currChartUpdate)
    console.log(this.chartItems)
    localStorage.setItem('chart',JSON.stringify(this.chartItems))
    this.addQuantity();
  }
  update(){

  }
  delete(i:number){
    console.log(i);
    this.chartItems.splice(i,1);
    localStorage.setItem('chart',JSON.stringify(this.chartItems));
    this._SharedService.chartLength--;
    console.log(this.chartItems)
  }
}
