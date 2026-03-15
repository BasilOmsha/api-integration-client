import { useQuery } from '@tanstack/react-query'

import { metaDataService } from '../api/services/metaDataService.ts'
import type { MetaDataReadDto } from '@/types/fingrid.ts'
import type { ApiError } from '@/utils/errors.ts'

export const useMetaData = (datasetId: number | null) => {
    return useQuery<MetaDataReadDto, ApiError>({
        queryKey: ['metadata', datasetId],
        queryFn: async () => {
            return metaDataService.getByDatasetId(datasetId!)
        },
        retry: (failureCount, error: ApiError) => {
            const noRetry = [400, 401, 403, 404, 422, 429].includes(error.statusCode ?? 0)
            if (noRetry) return false
            return failureCount < 3
        },
        enabled: datasetId !== null,
        staleTime: 1000 * 60 * 60
    })
}
