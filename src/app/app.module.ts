import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { ConnectorsListComponent } from './components/connectors-list/connectors-list.component';
import { ConnectorDetailsComponent } from './components/connector-details/connector-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ConnectorsListComponent,
    ConnectorDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
