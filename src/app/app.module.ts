import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { STATES } from './state';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './components/layout/layout.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    NgxsModule.forRoot(STATES, {
      developmentMode: !environment.production,
    }),
  ],
  providers: [AuthGuard, AuthService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
