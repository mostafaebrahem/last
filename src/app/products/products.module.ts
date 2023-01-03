import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from "../shared/shared.module";
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        AllProductsComponent,
        ProductDetailsComponent,
        ProductComponent
    ],
    exports: [
        AllProductsComponent,
        ProductDetailsComponent,
        ProductComponent,
        FormsModule,
    ],
    imports: [
CommonModule,
        SharedModule,
        FormsModule,
        RouterModule,
        NgbModule

    ]
})
export class ProductsModule { }
