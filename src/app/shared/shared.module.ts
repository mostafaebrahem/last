import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { SelectComponent } from './select/select.component';
import { FooterComponent } from './footer/footer.component'


@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    SelectComponent,
    FooterComponent
  ],
  imports: [
  CommonModule,
    RouterModule,

  ],
  exports:[
    HeaderComponent,
    HttpClientModule,
    LoadingComponent,
    SelectComponent,
    FooterComponent
  ]
})
export class SharedModule { }
