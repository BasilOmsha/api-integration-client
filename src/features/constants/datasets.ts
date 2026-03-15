export type ChartType = 'line' | 'step'

export interface DatasetConfig {
    id: number
    label: string
    description: string
    unit: string
    chartType: ChartType
    maxRangeDays: number
}

export interface ComboSeriesConfig {
    datasetId: number
    label: string
    unit: string
    color: string
    yAxis: 'left' | 'right'
}

export interface ComboDatasetConfig {
    id: string
    label: string
    description: string
    series: ComboSeriesConfig[]
}

export const DATASETS: DatasetConfig[] = [
    {
        id: 124,
        label: 'Electricity consumption in Finland',
        description: 'Consumption = Production + Import - Export. 15 min resolution.',
        unit: 'MW',
        chartType: 'line',
        maxRangeDays: 365
    },
    {
        id: 396,
        label: 'Emission factor for electricity consumed in Finland - updated every 15 minutes',
        description: 'CO2 estimate based on production, import and export. 15 min resolution.',
        unit: 'gCO2/kWh',
        chartType: 'line',
        maxRangeDays: 90
    },
    {
        id: 364,
        label: 'Electricity consumption by user group in Finnish distribution networks',
        description: 'Aggregate hourly metering data categorised by user group. 1 h resolution.',
        unit: 'kWh',
        chartType: 'line',
        maxRangeDays: 90
    },
    {
        id: 336,
        label: 'Electricity shortage status',
        description:
            '0 = Normal, 1 = Possible, 2 = High risk, 3 = Shortage. Updated every 3 minutes.',
        unit: 'status',
        chartType: 'step',
        maxRangeDays: 30
    }
]

export const COMBO_DATASETS: ComboDatasetConfig[] = [
    {
        id: 'combo-emission-consumption',
        label: 'Emission vs Consumption',
        description: 'Emission factor overlaid with electricity consumption',
        series: [
            {
                datasetId: 396,
                label: 'Emission factor',
                unit: 'gCO2/kWh',
                color: 'hsl(0, 72%, 51%)',
                yAxis: 'left'
            },
            {
                datasetId: 124,
                label: 'Consumption',
                unit: 'MW',
                color: 'hsl(217, 91%, 60%)',
                yAxis: 'right'
            }
        ]
    },
    {
        id: 'combo-wind-emission',
        label: 'Wind Production vs Emission',
        description: 'Wind power generation overlaid with CO2 emission factor',
        series: [
            {
                datasetId: 75,
                label: 'Wind production',
                unit: 'MW',
                color: 'hsl(142, 71%, 45%)',
                yAxis: 'left'
            },
            {
                datasetId: 396,
                label: 'Emission factor',
                unit: 'gCO2/kWh',
                color: 'hsl(0, 72%, 51%)',
                yAxis: 'right'
            }
        ]
    },
    {
        id: 'combo-solar-emission',
        label: 'Solar Production vs Emission',
        description: 'Solar power generation overlaid with CO2 emission factor',
        series: [
            {
                datasetId: 248,
                label: 'Solar Production',
                color: '#f59e0b',
                yAxis: 'left',
                unit: 'MW'
            },
            {
                datasetId: 396,
                label: 'Emission factor',
                unit: 'gCO2/kWh',
                color: 'hsl(0, 72%, 51%)',
                yAxis: 'right'
            }
        ]
    }
]
