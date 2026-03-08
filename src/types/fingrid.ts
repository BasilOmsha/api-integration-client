export interface License {
  name: string
  termsLink: string
}

export interface MetaDataReadDto {
  id: string
  datasetId: number
  modifiedAtUtc: string
  type: string
  status: string
  organization: string
  nameEn: string
  descriptionEn: string
  dataPeriodEn: string
  updateCadenceEn: string | null
  unitEn: string
  contactPersons: string
  license: License | null
  keyWordsEn: string[]
  contentGroupsEn: string[]
  availableFormats: string[]
  dataAvailableFromUtc: string | null
}

export interface CachedDataPointReadDto {
  id: string
  datasetId: number
  startTime: string
  endTime: string
  value: number
  cachedAtUtc: string
}