import { BaseModel } from '@/data/common'

export class NoticeDto extends BaseModel {
  id: number
  title: string
  content: string
}
