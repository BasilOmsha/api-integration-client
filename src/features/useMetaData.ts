import { useQuery } from '@tanstack/react-query'

import { metaDataService } from '../api/services/metaDataService.ts'


export const useMetaData = (datasetId: number | null) => {
  return useQuery({
    queryKey: ['metadata', datasetId],
    queryFn: () => metaDataService.getByDatasetId(datasetId!),
    enabled: datasetId !== null,
    staleTime: 1000 * 60 * 60, // 1 hour — metadata rarely changes
  })
}