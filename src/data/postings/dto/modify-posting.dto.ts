import { PostingCategoriesType } from '@/domains/posting'

export class ModifyPostingDto {
  category?: PostingCategoriesType
  title?: string
  content?: string
  isBlind?: boolean
}
