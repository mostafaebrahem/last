import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  chart:any[]=[];

  constructor(private _SharedService:SharedService) { }

  ngOnInit(): void {

    // setInterval(()=>{
      //  this.getChart()
      // },1000)

        this.getChart();

    }
    getChart(){
    //   if('chart' in localStorage){
    //   this.chart=JSON.parse(localStorage.getItem('chart')!);

    // }else{
    //   this.chart=[];
    // }
   this.chart= this._SharedService.chartItems;
   console.log("from header",this.chart)
  }
}
