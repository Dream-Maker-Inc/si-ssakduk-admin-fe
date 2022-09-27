export abstract class BaseModel {
  private createdAt: string
  private updatedAt: string
  private deletedAt?: string

  get createdDate() {
    return new Date(this.createdAt)
  }

  get updatedDate() {
    return new Date(this.updatedAt)
  }

  get deletedDate() {
    return this.deletedAt ? new Date(this.deletedAt) : undefined
  }
}
