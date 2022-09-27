import { BaseModel } from '@/data/common'

export class LifePostingDto extends BaseModel {
  id: number
  title: string
  content: string
  viewCount: number
  attachments: string[]
  link: string
}
