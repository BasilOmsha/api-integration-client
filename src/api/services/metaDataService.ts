import api from '../index.ts'
import type { MetaDataReadDto } from '../../types/fingrid.ts'

export const metaDataService = {
    getByDatasetId: async (datasetId: number): Promise<MetaDataReadDto> => {
        const response = await api.get<MetaDataReadDto>(`/fingrid-meta-data/${datasetId}`)
        return response.data
    }
}
