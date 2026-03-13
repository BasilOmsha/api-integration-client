import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import type { MetaDataReadDto } from '../../types/fingrid.ts'

interface MetaDataPanelProps {
  metaData: MetaDataReadDto | undefined
  isLoading: boolean
}

export const MetaDataPanel = ({ metaData, isLoading }: MetaDataPanelProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          {isLoading ? <Skeleton className="h-6 w-48" /> : metaData ? metaData.nameEn : 'Dataset Info'}
        </CardTitle>
        {isLoading
          ? <Skeleton className="h-4 w-full mt-1" />
          : <p className="text-sm text-muted-foreground">{metaData?.descriptionEn ?? 'Search a dataset to see its metadata.'}</p>
        }
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : metaData ? (
          <>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="text-muted-foreground">Unit: <span className="text-foreground font-medium">{metaData.unitEn}</span></span>
              <span className="text-muted-foreground">Period: <span className="text-foreground font-medium">{metaData.dataPeriodEn}</span></span>
              <span className="text-muted-foreground">Organization: <span className="text-foreground font-medium">{metaData.organization}</span></span>
              <span className="text-muted-foreground">Status: <Badge variant="outline">{metaData.status}</Badge></span>
            </div>
            {metaData.license && (
              <a href={metaData.license.termsLink} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                {metaData.license.name}
              </a>
            )}
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}