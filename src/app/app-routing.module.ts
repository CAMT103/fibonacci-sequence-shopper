import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FibonacciComponent } from './components/fibonacci/fibonacci.component';
import { AboutComponent } from './components/about/about.component';


const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'fibonacci', component: FibonacciComponent },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch:'full', redirectTo:'fibonacci' },
  { path: '**', pathMatch:'full', redirectTo:'fibonacci' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
