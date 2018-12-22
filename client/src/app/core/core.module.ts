import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services';
import { AuthGuard } from './guards';
import { AppMaterialModule } from './app-material/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [
    AppMaterialModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule { }
