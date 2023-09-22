import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    chartItems:any[]=[];
    salary:number=0;
    currChartUpdate:any;
    quantities:number[]=[];
    amount!:number;
    totalAmounts:number=0;
  constructor(private _SharedService:SharedService) {
    this.gettingChart();
        this.getSalary();
  }

  ngOnInit(): void {

  }
  confirming(){
     
Swal.fire({
  title: 'Do you want to confirm buying these items ?',
  showCancelButton: true,
  confirmButtonText: 'confirm',
  denyButtonText: `cancel`,
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('done!', 'buying confirmed successfully', 'success')
  } 
})
  }
  getSalary(){
    this.salary=0;
    this.totalAmounts=0
    for(let i=0;i<this.chartItems.length;i++){
      this.salary+=this.chartItems[i].quantity*this.chartItems[i].item.price;
      this.totalAmounts+=this.chartItems[i].quantity
    }
    console.log('salary',this.salary)
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
  activateUpdate(i:number){
    return this.quantities[i]==this.chartItems[i].quantity?true:false;
  }
  updates(i:number){
     
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
      this.currChartUpdate=this.chartItems[i];
    this.currChartUpdate.quantity=this.quantities[i];
    this.chartItems[i]=this.currChartUpdate
    console.log(this.chartItems)
    localStorage.setItem('chart',JSON.stringify(this.chartItems))
    this.addQuantity();
    this.getSalary();
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
    
  }

  delete(i:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.chartItems.splice(i,1);
        localStorage.setItem('chart',JSON.stringify(this.chartItems));
        this._SharedService.chartLength--;
        console.log(this.chartItems);
        this.getSalary();
      }
    })
   
  }
}
