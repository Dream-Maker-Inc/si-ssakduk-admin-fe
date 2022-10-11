export abstract class BaseModel {
  private createdAt: string
  private updatedAt: string
  private deletedAt?: string

  get createdDate() {
    return new Date(this.createdAt.slice(0, -1))
  }

  get updatedDate() {
    return new Date(this.updatedAt.slice(0, -1))
  }

  get deletedDate() {
    return this.deletedAt ? new Date(this.deletedAt.slice(0, -1)) : undefined
  }
}
