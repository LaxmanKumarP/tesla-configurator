import { Routes } from '@angular/router';
import { ModelColorComponent } from './components/model-color/model-color.component';
import { ConfigOptionsComponent } from './components/config-options/config-options.component';
import { SummaryComponent } from './components/summary/summary.component';

export const routes: Routes = [
    {path:'', component:ModelColorComponent},
    {path:'step1', component:ModelColorComponent},
    {path:'step2', component:ConfigOptionsComponent},
    {path:'step3', component:SummaryComponent},
    {path:'**', redirectTo: 'step1', pathMatch:'full'}
];
