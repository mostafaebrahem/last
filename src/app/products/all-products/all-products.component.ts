import { Component, OnInit } from '@angular/core';
import { SharedService } from './../../shared/services/shared.service';
import { ProInterface } from './../../interfaces/proInterface';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  allCategories: string[] = [];
  productsForDisplay: ProInterface[] = [];
  isAdded!: 0 | 1 | 2;
  searchCartona: any = [];
  currCategory: string = '';
  chartProducts: any[] = [];
  loading: boolean = false;

  constructor(public _SharedService: SharedService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  ngAfterViewInit(): void {
    this._SharedService.headerSearchInput?.addEventListener('change', (ele) => {
      this.getAllProducts();
    });
  }

  getAllCategories() {
    this.loadingStatus('start');
    this._SharedService.getAllCategories().subscribe(
      (res) => {
        this.loadingStatus('end');
        this.allCategories = res;
      },
      (err) => {
        this.loadingStatus('end');
      }
    );
  }
  getProductsByCategory() {
    this.loadingStatus('start');
    this.productsForDisplay = [];
    this._SharedService.getProductsByCategory(this.currCategory).subscribe(
      (res) => {
        this.loadingStatus('end');
        this.productsForDisplay = res;
      },
      (err) => {
        this.loadingStatus('end');
        alert('reeor ' + err.message);
      }
    );
  }
  addToChart(event: any) {
    if ('chart' in localStorage) {
      this.chartProducts = JSON.parse(localStorage.getItem('chart')!);
      let cartona = this.chartProducts.find(
        (index) => index.item.id == event.item.id
      );
      if (cartona) {
        this.faild();
      } else {
        this.chartProducts.push(event);
        localStorage.setItem('chart', JSON.stringify(this.chartProducts));
        this._SharedService.chartLength++;
        this.success();
      }
    } else {
      this.chartProducts.push(event);
      localStorage.setItem('chart', JSON.stringify(this.chartProducts));
    }
  }

  getAllProducts() {
    this.loadingStatus('start');
    this._SharedService.getAllProducts().subscribe(
      (response) => {
        this.loadingStatus('end');
        if (this._SharedService.searchInput) {
          this.productsForDisplay = [];
          response.filter((item) => {
            let check = item.title
              .toLocaleLowerCase()
              .includes(this._SharedService.searchInput.toLocaleLowerCase());

            if (check) {
              this.productsForDisplay.push(item);
            }
          });
        } else {
          this.productsForDisplay = response;
        }
      },
      (err) => {
        this.loadingStatus('end');
      }
    );
  }
  filterCategory(e: any) {
    this.loadingStatus('start');
    this.currCategory = e.target.value;

    if (this.currCategory == 'all') {
      this.getAllProducts();
    } else {
      this.getProductsByCategory();
    }
  }
  //shared logic starts
  loadingStatus(status: string) {
    status === 'start' ? (this.loading = true) : (this.loading = false);
  }

  success() {
    this.isAdded = 2;
    Swal.fire('Congratulations!', 'Item added successfully ', 'success');
    setTimeout(() => {
      this.isAdded = 0;
    }, 3000);
  }
  faild() {
    this.isAdded = 1;
    Swal.fire(
      'faild to added!',
      'Item is already exist ,please check your chart',
      'error'
    );
    setTimeout(() => {
      this.isAdded = 0;
    }, 3000);
  }
  //shared logic ends
}
