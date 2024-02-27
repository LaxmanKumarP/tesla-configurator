import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Model, ModelComp, Options } from '../models/tesla';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  initalCacheObj: ModelComp ={
    'selectedModelData' : undefined,
    'selectedColorData':undefined,
    'selectedModel': '',
    selectedConfigData:undefined,
    selectedTowHitch: false,
    selectedYoke: false,
    selectedImg: ''
  }
  private modelColorCompData$ = new BehaviorSubject<ModelComp>(this.initalCacheObj);

  constructor(private http:HttpClient) { }

  getModelData(): Observable<Model[]>{
    return this.http.get<Model[]>("/models");
  }

  getConfigData(modelCode:string): Observable<Options>{
    return this.http.get<Options>(`/options/${modelCode}`);
  }


  setModelColorCompData(data:ModelComp){
    this.modelColorCompData$.next(data)
  }

  getModelColorCompData(){
    return this.modelColorCompData$
  }


}
