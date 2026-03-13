import { useContext } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { FingridSearchContext } from './contexts/fingridSearchContext.ts'
import { useMetaData } from './useMetaData.ts'
import { useDataPoints } from './useDataPoints.ts'
import type { DatasetSearchFormValues } from '../schemas/datasetSearchSchema.ts'
import { isComboDataset } from '@/types/fingrid.ts'
import { COMBO_DATASETS, DATASETS } from './constants/datasets.ts'

const MAX_COMBO_SERIES = 4

export function useFingridSearch() {
    const context = useContext(FingridSearchContext)
    if (!context) throw new Error('useFingridSearch must be used within FingridSearchProvider')

    const {
        selectedDataset,
        startTime,
        endTime,
        formValues,
        setSelectedDataset,
        setStartTime,
        setEndTime,
        setFormValues,
        clear,
    } = context

    const queryClient = useQueryClient()

    const datasetId = selectedDataset && !isComboDataset(selectedDataset)
        ? selectedDataset.id
        : null

    const comboSeries = selectedDataset && isComboDataset(selectedDataset)
        ? selectedDataset.series
        : []

    const seriesSlots = Array.from({ length: MAX_COMBO_SERIES }, (_, i) => comboSeries[i] ?? null)

    const { data: metaData, isFetching: metaFetching } = useMetaData(datasetId)
    const { data: dataPoints, isFetching: dataFetching } = useDataPoints({
        datasetId: metaData ? datasetId : null,
        startTime,
        endTime,
    })

    const combo0Meta = useMetaData(seriesSlots[0]?.datasetId ?? null)
    const combo1Meta = useMetaData(seriesSlots[1]?.datasetId ?? null)
    const combo2Meta = useMetaData(seriesSlots[2]?.datasetId ?? null)
    const combo3Meta = useMetaData(seriesSlots[3]?.datasetId ?? null)

    const combo0Data = useDataPoints({
        datasetId: combo0Meta.data ? seriesSlots[0]?.datasetId ?? null : null,
        startTime,
        endTime,
    })
    const combo1Data = useDataPoints({
        datasetId: combo1Meta.data ? seriesSlots[1]?.datasetId ?? null : null,
        startTime,
        endTime,
    })
    const combo2Data = useDataPoints({
        datasetId: combo2Meta.data ? seriesSlots[2]?.datasetId ?? null : null,
        startTime,
        endTime,
    })
    const combo3Data = useDataPoints({
        datasetId: combo3Meta.data ? seriesSlots[3]?.datasetId ?? null : null,
        startTime,
        endTime,
    })

    const comboHooks = [
        { meta: combo0Meta, data: combo0Data },
        { meta: combo1Meta, data: combo1Data },
        { meta: combo2Meta, data: combo2Data },
        { meta: combo3Meta, data: combo3Data },
    ]

    const comboData = comboSeries.length > 0
        ? comboSeries.map((config, i) => ({
            config,
            points: comboHooks[i].data.data ?? [],
        }))
        : null

    const comboFetching = comboHooks.some(h => h.meta.isFetching || h.data.isFetching)

    const isFetching = metaFetching || dataFetching || comboFetching

    const handleSearch = (values: DatasetSearchFormValues) => {
        const comboMatch = COMBO_DATASETS.find(d => d.id === values.datasetConfigId)
        const singleMatch = DATASETS.find(d => String(d.id) === values.datasetConfigId)
        const dataset = comboMatch ?? singleMatch ?? null

        if (!dataset) return

        setFormValues(values)
        setSelectedDataset(dataset)
        setStartTime(new Date(values.startTime).toISOString())
        setEndTime(new Date(values.endTime).toISOString())
    }

    const handleClear = () => {
        if (selectedDataset) {
        if (isComboDataset(selectedDataset)) {
            for (const s of selectedDataset.series) {
            queryClient.removeQueries({ queryKey: ['metadata', s.datasetId] })
            queryClient.removeQueries({ queryKey: ['datapoints', s.datasetId] })
            }
        } else {
            queryClient.removeQueries({ queryKey: ['metadata', selectedDataset.id] })
            queryClient.removeQueries({ queryKey: ['datapoints', selectedDataset.id] })
        }
        }
        clear()
    }

    return {
        selectedDataset,
        metaData,
        dataPoints,
        comboData,
        isFetching,
        formValues,
        handleSearch,
        handleClear,
        saveFormValues: setFormValues,
    }
}