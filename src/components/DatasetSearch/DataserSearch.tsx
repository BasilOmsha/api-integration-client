import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { datasetSearchSchema, type DatasetSearchFormValues } from '../../schemas/datasetSearchSchema.ts'

interface DatasetSearchProps {
  onSearch: (values: DatasetSearchFormValues) => void
  isLoading: boolean
}

export const DatasetSearch = ({ onSearch, isLoading }: DatasetSearchProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DatasetSearchFormValues>({
    resolver: zodResolver(datasetSearchSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSearch)} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Search Dataset</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Dataset ID</label>
        <input
          {...register('datasetId')}
          placeholder="e.g. 245"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.datasetId && <span className="text-xs text-red-500">{errors.datasetId.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Start Time (UTC)</label>
        <input
          {...register('startTime')}
          type="datetime-local"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.startTime && <span className="text-xs text-red-500">{errors.startTime.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">End Time (UTC)</label>
        <input
          {...register('endTime')}
          type="datetime-local"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.endTime && <span className="text-xs text-red-500">{errors.endTime.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
      >
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
    </form>
  )
}