import { Component } from '@angular/core';
import { TeslaService } from '../../services/tesla.service';
import { Config, ModelComp, Options } from '../../models/tesla';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-config-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './config-options.component.html',
  styleUrl: './config-options.component.scss'
})
export class ConfigOptionsComponent {
  configData!: Options;
  selectedModelData!: ModelComp
  configForm!: FormGroup;
  selectedConfigData: Config | undefined;
  selectedImg!: string;

  constructor(private teslaService: TeslaService, private fb: FormBuilder) { };
  ngOnInit() {
    this.buildForm();
    this.teslaService.getModelColorCompData().pipe(take(1)).subscribe((res: ModelComp) => {
    this.selectedModelData = res || null;
    if (this.selectedModelData) {
        this.getConfigOptions();
      }
    });
    this.subscriptions();
  }
  getConfigOptions() {
    this.teslaService.getConfigData(this.selectedModelData.selectedModel).pipe(take(1)).subscribe((data: Options) => {
      this.configData = data;
      this.selectedImg = this.selectedModelData.selectedImg;
    });
    if(this.selectedModelData.selectedConfigData){
      this.bindForm();
    }
  }
  bindForm(){
    this.selectedConfigData = this.selectedModelData.selectedConfigData;
    this.configForm.patchValue({
      'configType': this.selectedConfigData?.id,
      'towHitch': this.selectedModelData.selectedTowHitch,
      'yoke': this.selectedModelData.selectedYoke
    })
  }

  buildForm() {
    this.configForm = this.fb.group({
      configType: new FormControl(''),
      towHitch: new FormControl(''),
      yoke: new FormControl('')
    });


  }

  subscriptions(){
    this.configForm.valueChanges.subscribe(value => {
      this.selectedConfigData = undefined;
      if (value.configType) {
        this.selectedConfigData = this.configData?.configs.find(ele => ele.id === Number(value.configType)) || undefined;
      }
      if(this.selectedModelData){
        const obj = {...this.selectedModelData, 'selectedConfigData': this.selectedConfigData, selectedTowHitch: value.towHitch,
        selectedYoke:value.yoke};
        this.teslaService.setModelColorCompData(obj);
      }
    })
  }

  onConfigChanges(){
  }
  onColorChanges(){
  }

}

