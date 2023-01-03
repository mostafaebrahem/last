import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    chartItems:any[]=[];
    // isUpdate:boolean[]=[];
    currChartUpdate:any;
    quantities:number[]=[];
    amount!:number;
  constructor() { }

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
    // console.log(this.chartItems[i])
    this.currChartUpdate=this.chartItems[i];
    this.currChartUpdate.quantity=this.quantities[i];
    // console.log(this.currChartUpdate);
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
    localStorage.setItem('chart',JSON.stringify(this.chartItems))
    console.log(this.chartItems)
  }
}
