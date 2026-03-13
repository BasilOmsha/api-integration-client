import { useState, type ReactNode } from 'react'

import { FingridSearchContext } from './fingridSearchContext.ts'
import type { DatasetSearchFormValues } from '@/schemas/datasetSearchSchema.ts'
import type { SelectedDataset } from '@/types/fingrid.ts'

export function FingridSearchProvider({ children }: { children: ReactNode }) {
  const [selectedDataset, setSelectedDataset] = useState<SelectedDataset | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<DatasetSearchFormValues | null>(null)

  const clear = () => {
    setSelectedDataset(null)
    setStartTime(null)
    setEndTime(null)
    setFormValues(null)
  }

  return (
    <FingridSearchContext.Provider value={{
      selectedDataset,
      startTime,
      endTime,
      formValues,
      setSelectedDataset,
      setStartTime,
      setEndTime,
      setFormValues,
      clear,
    }}>
      {children}
    </FingridSearchContext.Provider>
  )
}