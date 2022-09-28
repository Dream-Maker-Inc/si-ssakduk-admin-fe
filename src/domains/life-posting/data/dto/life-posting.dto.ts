import { BaseModel } from '@/data/common'
import _ from 'lodash'

export class LifePostingDto extends BaseModel {
  id: number
  title: string
  content: string
  viewCount: number
  attachments: string[]
  link: string

  fetchAttachmentFiles() {
    return Promise.all(
      _.chain(this.attachments)
        .map(async it => await fetch(it))
        .map(async res => (await res).blob())
        .map(async blob => {
          const _blob = await blob
          return new File([_blob], 'image.png', { type: _blob.type })
        })
        .value(),
    )
  }
}
