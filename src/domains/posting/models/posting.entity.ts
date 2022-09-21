import { BlindModel } from '@/data/common'
import { Type } from 'class-transformer'
import { findPostingCategories, PostingCategories } from './posting.types'

export class PostingEntity {
  id: number
  authorId: number
  private category: string
  title: string
  content: string
  viewCount: number
  attachments: any[]
  private createdAt: string
  private updatedAt: string
  private deletedAt?: any

  @Type(() => BlindModel)
  blind: BlindModel

  get isBlind() {
    return !!this.blind
  }

  get categoryModel() {
    return findPostingCategories(this.category) ?? PostingCategories.All
  }

  get createdDate() {
    return new Date(this.createdAt)
  }

  get updatedDate() {
    return new Date(this.updatedAt)
  }

  get deletedDate() {
    return this.deletedAt ? new Date(this.deletedAt) : undefined
  }

  get stateText() {
    if (!!this.deletedDate) return '삭제됨'
    if (this.isBlind) return '숨김'

    return '공개'
  }
}
