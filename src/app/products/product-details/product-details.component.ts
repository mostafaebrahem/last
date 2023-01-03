import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProInterface } from './../../interfaces/proInterface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  itemId:any=0;
  amount:number=0;
  addToChart:boolean=false;
  item!:ProInterface;
  allChartData:any[]=[];
  constructor(private _SharedService:SharedService,private _ActivatedRoute:ActivatedRoute) {
    this.itemId= this._ActivatedRoute.snapshot.paramMap.get('id');
    console.log(this.itemId)
   }

  ngOnInit(): void {
   this.getProduct()
  }
  getProduct(){

     this._SharedService.getSingleProduct(this.itemId).subscribe((prd)=>{
      this.item=prd
      console.log(this.item)
    })
  }
  add(){
    if('chart' in localStorage){
      this.allChartData= JSON.parse(localStorage.getItem('chart')!) ;
      let test= this.allChartData.find(index=>index.item.id==this.itemId);
      console.log(test);
      if(test){
        alert('this product is already exist in your chart ')
      }else{
        this.allChartData.push({'item':this.item,'quantity':this.amount});
        // console.log(this.allChartData)
        localStorage.setItem('chart',JSON.stringify(this.allChartData));
      }
    }else{
      this.allChartData.push({'item':this.item,'quantity':this.amount});
        // console.log(this.allChartData)
        localStorage.setItem('chart',JSON.stringify(this.allChartData));
    }
  }


}
