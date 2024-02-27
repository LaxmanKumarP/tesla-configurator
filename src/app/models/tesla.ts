export interface Model {
    code: string,
    description: string,
    colors: Color[]
}

export interface Color {
    code: string,
    description: string,
    price: number
}

export interface Options {
    configs: Config[],
    towHitch: boolean,
    yoke: boolean
}

export interface Config {
    id: number,
    description: string,
    range: number,
    speed: number,
    price: number
}


export interface ModelComp{
    selectedModelData :Model | undefined,
    selectedColorData: Color | undefined,
    selectedModel: string,
    selectedConfigData: Config | undefined,
    selectedTowHitch: boolean,
    selectedYoke: boolean,
    selectedImg: string
}

export interface modelSummary {
    description: string | undefined,
    configuration: string | undefined,
    cofig_price:number | undefined,
    config_maxSpeed: number | undefined,
    config_range: number | undefined,
    config_color: string | undefined,
    config_color_price: number | undefined,
    selectedTowHitch: number,
    selectedYoke: number
}
