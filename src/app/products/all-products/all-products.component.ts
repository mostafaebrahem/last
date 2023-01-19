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
  isAdded!:0|1|2;

   currCategory:string="";
   chartProducts:any[]=[];
   loading:boolean=false;

  constructor(private _SharedService:SharedService,) {

   }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllCategories()

  }
  success(){
    this.isAdded=2;
    setTimeout(()=>{
      this.isAdded=0;
    },3000)

  }
  faild(){
    this.isAdded=1;
    setTimeout(()=>{
      this.isAdded=0;
    },3000)
  }
  getAllCategories(){
    this.loading=true;
    this._SharedService.getAllCategories().subscribe((res)=>{
      this.loading=false;
    this.allCategories=res;

    },err=>{
      this.loading=false;
      // alert('error '+err.message);

    })
  }
  getProductsByCategory(){
    this.loading=true;
    this._SharedService.getProductsByCategory(this.currCategory).subscribe((res)=>{
      this.loading=false;
      this.allProducts=res;

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
        // alert('this product is already exist in your chart');
        this.faild();

      }else{
         this.chartProducts.push(event);
        localStorage.setItem('chart',JSON.stringify(this.chartProducts));
        this._SharedService.chartLength++;
        console.log("chartLength ",this._SharedService.chartLength)
        this.success();
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
      // alert('error '+err.message)
    });
  }
  filterCategory(e:any){
    this.loading=true;
    this.currCategory=e.target.value;

    if(this.currCategory=="all"){
      this.getAllProducts();

    }else{
      this.getProductsByCategory();

    }
  }


}
