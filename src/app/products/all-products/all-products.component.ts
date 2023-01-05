import { Component, OnInit } from '@angular/core';
import { SharedService } from './../../shared/services/shared.service';
import { ProInterface } from './../../interfaces/proInterface';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  allProducts:ProInterface[]=[];
  allCategories:string[]=[];

   currCategory:string="";
   chartProducts:any[]=[];
   loading:boolean=false;

  constructor(private _SharedService:SharedService) {
    for(let i=0;i<this.allProducts.length;i++){

    }
   }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllCategories()

  }
  getAllCategories(){
    this.loading=true;
    this._SharedService.getAllCategories().subscribe((res)=>{
      this.loading=false;
    this.allCategories=res;
    // console.log(this.allCategories)
    },err=>{
      this.loading=false;
      alert('error '+err.message)
    })
  }
  getProductsByCategory(){
    this.loading=true;
    this._SharedService.getProductsByCategory(this.currCategory).subscribe((res)=>{
      this.loading=false;
      this.allProducts=res;
      // console.log(this.allProducts)
    },err=>{
      this.loading=false;
      alert('reeor '+err.message)
    })
  }
  addToChart(event:any){

    if('chart' in localStorage){
      this.chartProducts=JSON.parse(localStorage.getItem('chart')!);
      let cartona=this.chartProducts.find(index=>index.item.id==event.item.id
      )
      if(cartona){
        alert('this product is already exist in your chart');

      }else{
         this.chartProducts.push(event);
        localStorage.setItem('chart',JSON.stringify(this.chartProducts));
        
      }

    }else{
      this.chartProducts.push(event);
      localStorage.setItem('chart',JSON.stringify(this.chartProducts))
    }

  }
  getAllProducts(){
    this.loading=true;
    this._SharedService.getAllProducts().subscribe((response)=>{
      this.loading=false;
        this.allProducts=response ;
        console.log('all',this.allProducts)
    },  err=>{
      this.loading=false;
      alert('error '+err.message)
    });
  }
  filterCategory(e:any){
    this.loading=true;
    this.currCategory=e.target.value;
    // console.log(this.currCategory);
    if(this.currCategory=="all"){
      this.getAllProducts();
      // console.log( "all"+this.currProducts)
      // console.log( 'loading'+this.loading)
    }else{
      this.getProductsByCategory();
      // console.log( 'loading'+this.loading)
    }
  }

}
