export class BlindModel {
  private startedAt: Date
  endedAt?: Date
  reason: string = ''

  get startedDate() {
    return new Date(this.startedAt)
  }
}
