import { BaseModelWithBlind } from '@/data/common'
import { findPostingCategoriesByValue } from '../../models'

export class PostingDto extends BaseModelWithBlind {
  id: number
  private category: string
  title: string
  content: string
  viewCount: number
  attachments: string[]
  likedCount: number
  commentCount: number
  author: Author
  myLiked?: MyLiked

  get categoryType() {
    return findPostingCategoriesByValue(this.category)
  }
}

class Author {
  id: number
  nickname: string
}

class MyLiked {
  id: number
}
