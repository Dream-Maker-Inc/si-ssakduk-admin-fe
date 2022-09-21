import { BlindModel } from '@/data/common'
import { Type } from 'class-transformer'

export class MemberEntity {
  constructor(
    public id: number,
    public email: string,
    public nickname: string,
    public name: string,
    public birthDay: string,
    public phone: string,
    private profileImageUrl: string,
    private createdAt: string,
    private updatedAt: string,
    private deletedAt?: string,
  ) {}

  @Type(() => BlindModel)
  blind: BlindModel

  get profileImage() {
    return this.profileImageUrl || '/images/place-holder.jpg'
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

  get isBlock() {
    return !!this.blind
  }

  get suspendedTextWithDate() {
    return this.isBlock
      ? `활동 정지 (~ ${
          this.blind?.endedDate?.toLocaleString() ?? '무기한'
        })\n정지 사유 (${this.blind.reason})`
      : '활동 중 (정상)'
  }

  get stateText() {
    if (!!this.deletedDate) return '탈퇴'
    if (this.isBlock) return '활동 정지'

    return '공개'
  }

  get stateTextDetail() {
    if (!!this.deletedDate)
      return `탈퇴 (${this.deletedDate?.toLocaleString()})`
    if (this.isBlock)
      return `활동 정지 (~ ${
        this.blind?.endedDate?.toLocaleString() ?? '무기한'
      })`

    return '공개'
  }

  get suspendedText() {
    return this.isBlock ? `활동 정지` : '활동 중'
  }

  get leavedText() {
    return this.deletedAt
      ? `탈퇴 (${this.deletedDate?.toLocaleString()})`
      : '활동 중 (정상)'
  }
}
