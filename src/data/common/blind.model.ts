export class BlindModel {
  private startedAt: Date
  private endedAt?: Date
  reason: string = ''

  get startedDate() {
    return new Date(this.startedAt)
  }

  get endedDate() {
    return this.endedAt && new Date(this.endedAt)
  }
}
