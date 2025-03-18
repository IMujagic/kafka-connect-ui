import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ConnectorsListComponent } from './components/connectors-list/connectors-list.component';
import { ConnectorDetailsComponent } from './components/connector-details/connector-details.component';
import { ApiUrlGuard } from './guards/api-url.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { 
    path: 'connectors', 
    component: ConnectorsListComponent,
    canActivate: [ApiUrlGuard]
  },
  { 
    path: 'connectors/:name', 
    component: ConnectorDetailsComponent,
    canActivate: [ApiUrlGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
