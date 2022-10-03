import { BaseModel } from '@/data/common'

export class ServiceTermDto extends BaseModel {
  id: number
  title: string
  content: string
  isRequired: boolean
}
