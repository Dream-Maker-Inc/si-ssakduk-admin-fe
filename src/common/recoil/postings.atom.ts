import { PostingCategories } from './../../domains/posting/models/posting.types'
import { atom } from 'recoil'

export const postingsSearchAtom = atom({
  key: 'postingsFilterState',
  default: {
    category: PostingCategories.All,
    keyword: '',
    withBlind: false,
  },
})
