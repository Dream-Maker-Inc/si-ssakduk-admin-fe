import { PostingCategory } from '@/domains/posting'

export class ModifyPostingDto {
  category?: PostingCategory
  title?: string
  content?: string
  isBlind?: boolean
}
