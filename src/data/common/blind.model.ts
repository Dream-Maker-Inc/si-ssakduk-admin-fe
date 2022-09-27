import { Type } from 'class-transformer'
import { BaseModel } from './base-model'

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

  /**
   * @deprecated
   */
  get blindedAtText() {
    return ``
  }
}

export class BaseModelWithBlind extends BaseModel {
  @Type(() => BlindModel)
  blind: BlindModel

  get isBlind() {
    return !!this.blind
  }
}
