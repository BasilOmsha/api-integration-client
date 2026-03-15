import { createContext } from 'react'

import type { DatasetSearchFormValues } from '../../schemas/datasetSearchSchema.ts'
import type { SelectedDataset } from '@/types/fingrid.ts'

export interface FingridSearchState {
    selectedDataset: SelectedDataset | null
    startTime: string | null
    endTime: string | null
    formValues: DatasetSearchFormValues | null
    setSelectedDataset: (dataset: SelectedDataset | null) => void
    setStartTime: (time: string | null) => void
    setEndTime: (time: string | null) => void
    setFormValues: (values: DatasetSearchFormValues | null) => void
    clear: () => void
}

export const FingridSearchContext = createContext<FingridSearchState | undefined>(undefined)
