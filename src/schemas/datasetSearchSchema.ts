import { z } from 'zod'

export const datasetSearchSchema = z.object({
  datasetId: z
    .string()
    .min(1, 'Dataset ID is required')
    .regex(/^[1-9]\d{0,2}$/, 'Dataset ID must be a number between 1 and 999'),
  startTime: z
    .string()
    .min(1, 'Start time is required'),
  endTime: z
    .string()
    .min(1, 'End time is required'),
}).refine(data => new Date(data.startTime) < new Date(data.endTime), {
  message: 'Start time must be before end time',
  path: ['endTime']
})

export type DatasetSearchFormValues = z.infer<typeof datasetSearchSchema>