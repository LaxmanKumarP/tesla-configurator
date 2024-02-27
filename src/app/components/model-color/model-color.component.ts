import { ModelComp } from './../../models/tesla';
import { Component } from '@angular/core';
import { TeslaService } from '../../services/tesla.service';
import { CommonModule } from '@angular/common';
import { Color, Model } from '../../models/tesla';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';


@Component({
  selector: 'app-model-color',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './model-color.component.html',
  styleUrl: './model-color.component.scss'
})
export class ModelColorComponent {
  modelsList: Model[] =[];
  modelForm !: FormGroup;
  modelColors!: Color;
  selectedModelData: Model| undefined;
  selectedImg!: string ;
  cacheModelData!: ModelComp;
  constructor(private teslaService:TeslaService, private fb: FormBuilder){ };
  ngOnInit(){
      this.teslaService.getModelData().subscribe(data => {
      this.modelsList = data;
    });
      this.buildForm();
      this.teslaService.getModelColorCompData().pipe(take(1)).subscribe((res:ModelComp)=>{
        if(res && res.selectedModelData){
          this.cacheModelData = res;
          this.bindFormData();
        }

      })

  };

  bindFormData(){
    this.modelForm.patchValue({
      modelType: this.cacheModelData.selectedModel,
      modelColor: this.cacheModelData.selectedColorData?.code
    });
    this.selectedModelData = this.cacheModelData.selectedModelData;
    this.updateImageURL();
  }

  buildForm(){
    this.modelForm = this.fb.group({
      modelType: new FormControl(''),
      modelColor: new FormControl(''),
      modelImg : new FormControl('')
    });
  }
  updateImageURL(){
    this.selectedImg = `https://interstate21.com/tesla-app/images/${this.modelForm.value.modelType}/${this.modelForm.value.modelColor}.jpg`;
  }

  onColorChanges(){
    this.updateImageURL();
    this.teslaService.setModelColorCompData({
      'selectedModelData' : this.selectedModelData,
      'selectedColorData': this.selectedModelData?.colors.find( (ele:Color) => ele.code == this.modelForm.value.modelColor) || undefined,
      'selectedModel': this.modelForm.value.modelType,
      selectedConfigData:undefined,
      selectedTowHitch: false,
      selectedYoke: false,
      selectedImg: this.selectedImg
    })
  }

  onTypeChanges(){
    this.selectedModelData = this.modelsList.find((model:Model) =>  model.code === this.modelForm.value.modelType );
    this.selectedImg = '';
    this.modelForm.controls['modelColor'].setValue(null);
    this.teslaService.setModelColorCompData({
      'selectedModelData' : this.selectedModelData,
      'selectedColorData': this.selectedModelData?.colors.find( (ele:Color) => ele.code == this.modelForm.value.modelColor) || undefined,
      'selectedModel': this.modelForm.value.modelType,
      selectedConfigData:undefined,
      selectedTowHitch: false,
      selectedYoke: false,
      selectedImg: this.selectedImg
    })
  }
}
