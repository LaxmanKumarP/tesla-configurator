import { Component } from '@angular/core';
import { TeslaService } from '../../services/tesla.service';
import { FormBuilder } from '@angular/forms';
import { ModelComp, modelSummary } from '../../models/tesla';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  selectedModelData!: ModelComp;
  addittionAmount: number =1000;
  modelSummary!: modelSummary;
  totalPriceAmount: number =0;
  selectedImg!: string;
  constructor(private teslaService: TeslaService, private fb: FormBuilder) { };
  ngOnInit() {
    this.teslaService.getModelColorCompData().subscribe((res: ModelComp) => {
    this.selectedModelData = res || null;
      if(this.selectedModelData){
        this.getPriceSummary();
      }
    })
  }
  getPriceSummary(){
    this.selectedImg = this.selectedModelData.selectedImg;
    this.modelSummary ={
      'description': this.selectedModelData.selectedModelData?.description,
      'configuration': this.selectedModelData.selectedConfigData?.description,
      'cofig_price': this.selectedModelData.selectedConfigData?.price,
      'config_maxSpeed': this.selectedModelData.selectedConfigData?.speed,
      'config_range': this.selectedModelData.selectedConfigData?.range,
      'config_color': this.selectedModelData.selectedColorData?.description,
      'config_color_price': this.selectedModelData.selectedColorData?.price,
      'selectedTowHitch': this.selectedModelData.selectedTowHitch == true? 1000: 0,
      'selectedYoke': this.selectedModelData.selectedYoke ==true ? 1000: 0,
    }
    this.totalPriceAmount = this.totalPriceAmount +( this.modelSummary.cofig_price ?this.modelSummary.cofig_price:0) + (this.modelSummary.config_color_price? this.modelSummary.config_color_price : 0)  + this.modelSummary.selectedTowHitch + this.modelSummary.selectedYoke;
  };
}
