import { BaseModelWithBlind } from '@/data/common'

export class CommentDto extends BaseModelWithBlind {
  id: number
  content: string
  likedCount: number
  author: Author
  posting: Posting
  myLiked?: MyLiked
}

class Author {
  id: number
  nickname: string
  name: string
  profileImage: string
}

class Posting {
  id: number
  title: string
}

class MyLiked {
  id: number
}
