import type { MetaDataReadDto } from '../../types/fingrid.ts'

interface MetaDataPanelProps {
  metaData: MetaDataReadDto
}

export const MetaDataPanel = ({ metaData }: MetaDataPanelProps) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-gray-800">{metaData.nameEn}</h2>
      <p className="text-sm text-gray-500">{metaData.descriptionEn}</p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
        <span><span className="font-medium">Unit:</span> {metaData.unitEn}</span>
        <span><span className="font-medium">Period:</span> {metaData.dataPeriodEn}</span>
        <span><span className="font-medium">Organization:</span> {metaData.organization}</span>
        <span><span className="font-medium">Status:</span> {metaData.status}</span>
      </div>
      {metaData.license && (
        <a
          href={metaData.license.termsLink}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-500 hover:underline"
        >
          {metaData.license.name}
        </a>
      )}
    </div>
  )
}