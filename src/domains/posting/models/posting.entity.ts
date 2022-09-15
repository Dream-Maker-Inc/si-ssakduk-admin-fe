export class PostingEntity {
  id: number
  authorId: number
  category: string
  title: string
  content: string
  viewCount: number
  attachments: any[]
  isBlind: boolean
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

  get blindStateText() {
    return this.isBlind ? '숨김' : '공개'
  }
}
