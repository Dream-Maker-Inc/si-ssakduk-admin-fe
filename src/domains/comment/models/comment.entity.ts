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

  get blindedAtText() {
    if (!this.blind) return ''

    return `( ${this.blind.startedDate.toLocaleString()} ${
      this.blind.reason
    } )으로 인해 블라인드 처리 되었습니다.`
  }

  get stateText() {
    if (!!this.deletedDate) return '삭제됨'
    if (this.isBlind) return '숨김'

    return '공개'
  }
}
