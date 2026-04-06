import SectionLayout from '../../../components/dashboard/layout/section-layout.tsx'
import { MetaDataPanel } from '../../../components/MetaDataPanel/MetaDataPanel.tsx'
import { ComboMetaDataPanel } from '../../../components/MetaDataPanel/ComboMetaDataPanel.tsx'
import { DatasetSearch } from '../../../components/DatasetSearch/DatasetSearch.tsx'
import { Chart } from '../../../components/Chart/Chart.tsx'
import { useFingridSearch } from '@/features/useFingridSearch.ts'
import { isComboDataset } from '@/types/fingrid.ts'

export default function FingridDashboard() {
    const {
        selectedDataset,
        metaData,
        dataPoints,
        comboData,
        isFetching,
        formValues,
        handleSearch,
        handleClear,
        saveFormValues
    } = useFingridSearch()

    const isCombo = selectedDataset && isComboDataset(selectedDataset)

    const unit = selectedDataset && !isCombo ? selectedDataset.unit : (metaData?.unitEn ?? '')

    const chartType = selectedDataset && !isCombo ? selectedDataset.chartType : 'line'

    return (
        <SectionLayout title="Fingrid Dashboard">
            <div className="flex-1 flex flex-col lg:flex-row lg:items-stretch gap-4">
                {/* Left column: search form + metadata stacked */}
                <div className="lg:w-96 shrink-0 flex flex-col gap-4 min-w-0">
                    <div className="shrink-0">
                        <DatasetSearch
                            onSearch={handleSearch}
                            onClear={handleClear}
                            onUnmount={saveFormValues}
                            isLoading={isFetching}
                            defaultValues={formValues}
                        />
                    </div>
                    <div className="flex-1 lg:min-h-100 overflow-auto">
                        {isCombo ? (
                            <ComboMetaDataPanel dataset={selectedDataset} />
                        ) : (
                            <MetaDataPanel metaData={metaData} isLoading={isFetching} />
                        )}
                    </div>
                </div>

                {/* Right column: chart stretches to match full height of left column */}
                <div className="h-[480px] lg:h-auto lg:flex-1 lg:min-h-0 resize-y overflow-hidden">
                    <Chart
                        dataPoints={dataPoints ?? []}
                        comboData={comboData}
                        unit={unit}
                        chartType={chartType}
                        isLoading={isFetching}
                    />
                </div>
            </div>
        </SectionLayout>
    )
}
