import type { CachedDataPointReadDto } from '../../types/fingrid'
import type { ChartType, ComboSeriesConfig } from '@/features/constants/datasets'

export interface ComboSeriesData {
  config: ComboSeriesConfig
  points: CachedDataPointReadDto[]
}

export interface ChartProps {
  dataPoints: CachedDataPointReadDto[]
  comboData?: ComboSeriesData[] | null
  unit: string
  chartType: ChartType
  isLoading: boolean
}