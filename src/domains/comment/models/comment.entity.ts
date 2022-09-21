import { BlindModel } from '@/data/common'
import { Type } from 'class-transformer'

export class CommentEntity {
  id: number
  authorId: number
  postingId: number
  content: string
  private createdAt: string
  private updateAt: string
  private deletedAt?: any

  @Type(() => BlindModel)
  blind: BlindModel

  get createdDate() {
    return new Date(this.createdAt)
  }

  get updatedDate() {
    return new Date(this.updateAt)
  }

  get deletedDate() {
    return this.deletedAt ? new Date(this.deletedAt) : undefined
  }

  get isBlind() {
    return !!this.blind
  }

  get stateText() {
    if (!!this.deletedDate) return '삭제됨'
    if (this.isBlind) return '숨김'

    return '공개'
  }
}
