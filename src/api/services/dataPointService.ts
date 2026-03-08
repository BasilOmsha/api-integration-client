import api from '../index.ts'
import type { CachedDataPointReadDto } from '../../types/fingrid.ts'

export const dataPointService = {
  getByDatasetIdAndRange: async (datasetId: number, startTime: string, endTime: string): Promise<CachedDataPointReadDto[]> => {
    const response = await api.get<CachedDataPointReadDto[]>(`/fingrid-meta-data/${datasetId}/data`, { params: { startTime, endTime } })
    return response.data
  }
}