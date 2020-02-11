import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, TranslateModule, RouterModule],
  declarations: [HeaderComponent,FooterComponent],
  exports: [HeaderComponent,FooterComponent]
})
export class SharedModule { }
