import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeslaService } from './services/tesla.service';
import { ModelComp } from './models/tesla';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe,RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  name = 'Angular';
  isAllowedRoute2:boolean = true;
  isAllowedRoute3: boolean = true;
  constructor(private teslaService:TeslaService){

  }


 ngOnInit(): void {
   this.teslaService.getModelColorCompData().subscribe((res:ModelComp) =>{
    console.log('res', res);
      this.isAllowedRoute2 = !res || !res.selectedColorData;
      this.isAllowedRoute3 = !res || !res.selectedColorData || !res.selectedConfigData;
   })
 }

 getDisability(){
  return this.isAllowedRoute2;
 }
 getDisability1(){
  return this.isAllowedRoute3;
 }
}
