import { BlindModel } from '@/data/common'

export class ModifyCommentDto {
  content?: string
  blind: BlindModel | null
}
