import { BlindModel } from '@/data/common'
import { PostingCategoriesType } from '@/domains/posting'

export class ModifyPostingDto {
  category?: PostingCategoriesType
  title?: string
  content?: string
  blind?: BlindModel | null
}
