import { useQuery } from '@tanstack/react-query'

import { dataPointService } from '../api/services/dataPointService.ts'
import type { ApiError } from '@/utils/errors.ts'
import type { CachedDataPointReadDto } from '@/types/fingrid.ts'

interface UseDataPointsParams {
  datasetId: number | null
  startTime: string | null
  endTime: string | null
}

export const useDataPoints = ({ datasetId, startTime, endTime }: UseDataPointsParams) => {
  return useQuery<CachedDataPointReadDto[], ApiError>({
    queryKey: ['datapoints', datasetId, startTime, endTime],
    queryFn: async ({ signal }) => {
      // await new Promise(resolve => setTimeout(resolve, 2000))
      return dataPointService.getByDatasetIdAndRange(datasetId!, startTime!, endTime!, signal)
    },
    retry: (failureCount: number, error: ApiError) => {
      const noRetryConditions = [
      error.statusCode === 400,
      error.statusCode === 401,
      error.statusCode === 403,
      error.statusCode === 404,
      error.statusCode === 422,
      error.statusCode === 429,
      ]
      if (noRetryConditions.some(condition => condition)) return false
      return failureCount < 3
    },
    enabled: datasetId !== null && startTime !== null && endTime !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
} 