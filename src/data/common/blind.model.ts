export class BlindModel {
  constructor(
    public reason: string = '',
    private endedAt?: Date,
    private startedAt?: Date,
  ) {}

  get startedDate() {
    return this.startedAt && new Date(this.startedAt)
  }

  get endedDate() {
    return this.endedAt && new Date(this.endedAt)
  }

  get reasonDetail() {
    return `( ${this?.startedDate?.toLocaleString()} ${this.reason} )`
  }

  get blindedAtText() {
    return `${this.reasonDetail}으로 인해 블라인드 처리 되었습니다.`
  }
}
