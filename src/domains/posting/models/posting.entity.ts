import { BaseEntity } from '@/common/models'
import { BlindModel } from '@/data/common'
import { Type } from 'class-transformer'
import { findPostingCategories, PostingCategories } from './posting.types'

export class PostingEntity extends BaseEntity {
  id: number
  authorId: number
  private category: string
  title: string
  content: string
  viewCount: number
  attachments: any[]

  get categoryModel() {
    return findPostingCategories(this.category) ?? PostingCategories.All
  }
}
