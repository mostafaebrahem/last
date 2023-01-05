import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  chart:any[]=[];
  
  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
     this.getChart()
    },1000)
  }
  getChart(){
    if('chart' in localStorage){
      this.chart=JSON.parse(localStorage.getItem('chart')!);

    }else{
      this.chart=[];
    }
  }
}
