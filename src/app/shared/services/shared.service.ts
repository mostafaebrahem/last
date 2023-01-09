import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProInterface } from './../../interfaces/proInterface';
import {  Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
   chartItems:any=new BehaviorSubject([]);
  constructor(private _HttpClient:HttpClient) { }

  getChart(){
    if('chart' in localStorage){
      let x=JSON.parse(localStorage.getItem('chart')!);
      this.chartItems.next(x)

      console.log("from service",this.chartItems)
      return  this.chartItems;
    }else{
      this.chartItems=[];
      console.log("from service",this.chartItems)
      return  this.chartItems;
    }
  }

  getAllProducts():Observable<ProInterface[]>{
    return this._HttpClient.get<ProInterface[]>('https://fakestoreapi.com/products')
  }
  getSingleProduct(id:number):Observable<ProInterface>{
    return this._HttpClient.get<ProInterface>(`https://fakestoreapi.com/products/${id}`);
  }
  getLimitProducts(limit:number){
    return this._HttpClient.get(`https://fakestoreapi.com/products?limit=${limit}`)
  }
  sortProducts(sort:string){
    // you can use with 'desc' or 'asc' as you want.
    return this._HttpClient.get(`https://fakestoreapi.com/products?sort=${sort}`)
  }
  getAllCategories():Observable<string[]>{
    return this._HttpClient.get<string[]>('https://fakestoreapi.com/products/categories')
  }
  getProductsByCategory(cat:string):Observable<ProInterface[]>{
    return this._HttpClient.get<ProInterface[]>(`https://fakestoreapi.com/products/category/${cat}`)
  }
  addProduct(product:ProInterface){
    this._HttpClient.post('https://fakestoreapi.com/products',JSON.stringify(product))
  }
  updateProduct(proID:number,updated:ProInterface){
    this._HttpClient.put(`https://fakestoreapi.com/products/${proID}`,updated)
  }
  deleteProduct(proID:number){
    this._HttpClient.delete(`https://fakestoreapi.com/products/${proID}`)
  }

}
