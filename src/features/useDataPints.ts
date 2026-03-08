import { useQuery } from '@tanstack/react-query'

import { dataPointService } from '../api/services/dataPointService.ts'

interface UseDataPointsParams {
  datasetId: number | null
  startTime: string | null
  endTime: string | null
}

export const useDataPoints = ({ datasetId, startTime, endTime }: UseDataPointsParams) => {
  return useQuery({
    queryKey: ['datapoints', datasetId, startTime, endTime],
    queryFn: () => dataPointService.getByDatasetIdAndRange(datasetId!, startTime!, endTime!),
    enabled: datasetId !== null && startTime !== null && endTime !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}