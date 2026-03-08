import { useState } from 'react'

import { useMetaData } from '../features/useMetaData.ts'
import { useDataPoints } from '../features/useDataPints.ts'
import type { DatasetSearchFormValues } from '../schemas/datasetSearchSchema.ts'
import { DatasetSearch } from '../components/DatasetSearch/DataserSearch.tsx'
import { MetaDataPanel } from '../components/MetaDataPanel/MetaDataPanel.tsx'
import { Chart } from '../components/Chart/Chart.tsx'



export const Dashboard = () => {
  const [datasetId, setDatasetId] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  const { data: metaData, isLoading: metaLoading } = useMetaData(datasetId)
  const { data: dataPoints, isLoading: dataLoading } = useDataPoints({ datasetId, startTime, endTime })

  const isLoading = metaLoading || dataLoading

  const handleSearch = (values: DatasetSearchFormValues) => {
    setDatasetId(parseInt(values.datasetId))
    setStartTime(new Date(values.startTime).toISOString())
    setEndTime(new Date(values.endTime).toISOString())
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900">Finnish Open Data Dashboard</h1>
        <DatasetSearch onSearch={handleSearch} isLoading={isLoading} />
        {metaData && <MetaDataPanel metaData={metaData} />}
        {dataPoints && dataPoints.length > 0 && metaData && (
          <Chart dataPoints={dataPoints} unit={metaData.unitEn} />
        )}
        {dataPoints && dataPoints.length === 0 && (
          <p className="text-sm text-gray-500 text-center">No data found for the selected range.</p>
        )}
      </div>
    </div>
  )
}