import { BaseEntity } from '@/common/models'

export class LifePostingEntity extends BaseEntity {
  id: number
  title: string
  content: string
  viewCount: number
  attachments: string
  link: string
}
