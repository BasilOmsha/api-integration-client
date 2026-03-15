import { z } from 'zod'

export const datasetSearchSchema = z
    .object({
        datasetConfigId: z.string().min(1, 'Please select a dataset'),
        startTime: z.string().min(1, 'Start time is required'),
        endTime: z.string().min(1, 'End time is required')
    })
    .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
        message: 'End time must be after start time',
        path: ['endTime']
    })

export type DatasetSearchFormValues = z.infer<typeof datasetSearchSchema>
