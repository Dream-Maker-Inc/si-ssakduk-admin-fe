import { BlindModel } from '@/data/common'
import { Type } from 'class-transformer'

export abstract class BaseEntity {
  @Type(() => BlindModel)
  blind?: BlindModel

  private createdAt: string
  private updatedAt: string
  private deletedAt?: any

  get createdDate() {
    return new Date(this.createdAt)
  }

  get updatedDate() {
    return new Date(this.updatedAt)
  }

  get deletedDate() {
    return this.deletedAt ? new Date(this.deletedAt) : undefined
  }

  get isBlind() {
    return !!this.blind
  }

  get stateText() {
    if (!!this.deletedDate) return '삭제'
    if (this.isBlind) return '숨김'

    return '공개'
  }
}
