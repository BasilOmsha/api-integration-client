import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ComboDatasetConfig } from '@/features/constants/datasets'

interface ComboMetaDataPanelProps {
  dataset: ComboDatasetConfig
}

export const ComboMetaDataPanel = ({ dataset }: ComboMetaDataPanelProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{dataset.label}</CardTitle>
        <p className="text-sm text-muted-foreground">{dataset.description}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        {dataset.series.map(s => (
          <span key={s.datasetId} className="text-muted-foreground">
            {s.yAxis === 'left' ? 'Left' : 'Right'} axis:{' '}
            <span className="text-foreground font-medium">
              {s.label} ({s.unit})
            </span>
          </span>
        ))}
        <span className="text-muted-foreground">
          Source:{' '}
          <span className="text-foreground font-medium">
            Fingrid Open Data, datasets {dataset.series.map(s => s.datasetId).join(' & ')}
          </span>
        </span>
      </CardContent>
    </Card>
  )
}