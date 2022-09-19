export class MemberEntity {
  constructor(
    public id: number,
    public email: string,
    public nickname: string,
    public name: string,
    public birthDay: string,
    public phone: string,
    private profileImageUrl: string,
    private suspendedAt: string,
    private createdAt: string,
    private updatedAt: string,
    private deletedAt?: string,
  ) {}

  get profileImage() {
    return this.profileImageUrl || '/images/place-holder.jpg'
  }

  get createdDate() {
    return new Date(this.createdAt)
  }

  get updatedDate() {
    return new Date(this.updatedAt)
  }

  get suspendedDate() {
    return this.suspendedAt ? new Date(this.suspendedAt) : undefined
  }

  get deletedDate() {
    return this.deletedAt ? new Date(this.deletedAt) : undefined
  }

  get suspendedTextWithDate() {
    return this.suspendedDate
      ? `활동 정지 (~ ${this.suspendedDate.toLocaleString()})`
      : '활동 중 (정상)'
  }

  get stateText() {
    if (!!this.deletedDate) return '탈퇴'
    if (!!this.suspendedDate) return '활동 정지'

    return '공개'
  }

  get stateTextDetail() {
    if (!!this.deletedDate)
      return `탈퇴 (${this.deletedDate?.toLocaleString()})`
    if (!!this.suspendedDate)
      return `활동 정지 (~ ${this.suspendedDate.toLocaleString()})`

    return '공개'
  }

  get suspendedText() {
    return this.suspendedDate ? `활동 정지` : '활동 중'
  }

  get leavedText() {
    return this.deletedAt
      ? `탈퇴 (${this.deletedDate?.toLocaleString()})`
      : '활동 중 (정상)'
  }
}
