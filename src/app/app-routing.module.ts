import { ForecastComponent } from './pages/forecast/forecast.component';
import { CurrentWeatherComponent } from './pages/currentWeather/currentWeather.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: CurrentWeatherComponent},
  { path: 'forecast', component: ForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
           RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
