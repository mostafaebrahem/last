import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(public _SharedService:SharedService) {

  }

  ngOnInit(): void {
  }
  searchingItems(){
    console.log(this._SharedService.searchInput)
  }
 searchKobry(){
  this._SharedService.inputFilter()
 }
}
