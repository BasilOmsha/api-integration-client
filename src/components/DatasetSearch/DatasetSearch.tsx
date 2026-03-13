import { useEffect, useRef } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { COMBO_DATASETS, DATASETS } from '@/features/constants/datasets.ts'
import { datasetSearchSchema, type DatasetSearchFormValues } from '../../schemas/datasetSearchSchema.ts'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'

interface DatasetSearchProps {
  onSearch: (values: DatasetSearchFormValues) => void
  onClear: () => void
  onUnmount: (values: DatasetSearchFormValues) => void
  isLoading: boolean
  defaultValues: DatasetSearchFormValues | null
}

export const DatasetSearch = ({ onSearch, onClear, onUnmount, isLoading, defaultValues }: DatasetSearchProps) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<DatasetSearchFormValues>({
    resolver: zodResolver(datasetSearchSchema),
    defaultValues: defaultValues ?? {
      datasetConfigId: '',
      startTime: '',
      endTime: '',
    },
  })

  const onUnmountRef = useRef(onUnmount)
  useEffect(() => {
    onUnmountRef.current = onUnmount
  })

  useEffect(() => {
    return () => {
      onUnmountRef.current(getValues())
    }
  }, [])

  const handleClear = () => {
    reset({ datasetConfigId: '', startTime: '', endTime: '' })
    onClear()
  }

  return (
    <Card className="h-full overflow-visible">
      <CardHeader>
        <CardTitle>Search Dataset</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSearch)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label>Dataset</Label>
            <Select
              onValueChange={(value) => setValue('datasetConfigId', value)}
              defaultValue={defaultValues?.datasetConfigId ?? ''}
            >
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Select a dataset" />
              </SelectTrigger>
              <SelectContent>
                {DATASETS.map(d => (
                  <SelectItem key={d.id} value={String(d.id)} className="cursor-pointer">
                    <span className="block truncate max-w-[280px]" title={d.label}>
                      {d.label}
                    </span>
                  </SelectItem>
                ))}
                {COMBO_DATASETS.map(d => (
                  <SelectItem key={d.id} value={d.id} className="cursor-pointer">
                    <span className="block truncate max-w-[280px]" title={d.label}>
                      {d.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.datasetConfigId && (
              <span className="text-xs text-destructive">{errors.datasetConfigId.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Start Time (UTC)</Label>
            <Input
              {...register('startTime')}
              type="datetime-local"
              className="cursor-pointer"
              onClick={e => (e.target as HTMLInputElement).showPicker()}
            />
            {errors.startTime && (
              <span className="text-xs text-destructive">{errors.startTime.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>End Time (UTC)</Label>
            <Input
              {...register('endTime')}
              type="datetime-local"
              className="cursor-pointer"
              onClick={e => (e.target as HTMLInputElement).showPicker()}
            />
            {errors.endTime && (
              <span className="text-xs text-destructive">{errors.endTime.message}</span>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Loading...' : 'Fetch Data'}
            </Button>
            <Button type="button" variant="outline" onClick={handleClear} disabled={isLoading}>
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}