import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { SelectComponent } from './select/select.component';
import { FooterComponent } from './footer/footer.component'

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
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
    // BrowserAnimationsModule,
    // ToastrModule.forRoot()

  ],
  exports:[
    HeaderComponent,
    HttpClientModule,
    LoadingComponent,
    SelectComponent,
    FooterComponent,
    // BrowserAnimationsModule,
    // ToastrModule
  ]
})
export class SharedModule { }
