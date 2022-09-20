import { atom, useRecoilState } from 'recoil'
import {
  CommentFilters,
  CommentFiltersType,
} from '../../domains/comment/models'

export const commentsSearchAtom = atom({
  key: 'commentsFilterState',
  default: {
    filter: CommentFilters.Content,
    keyword: '',
    withBlind: false,
  },
})

export const useCommentsSearchState = () => {
  const [commentsSearchState, setCommentsSearchState] =
    useRecoilState(commentsSearchAtom)
  const { filter, keyword, withBlind } = commentsSearchState

  const handleKeywordChange = (v: string) =>
    setCommentsSearchState({ ...commentsSearchState, keyword: v })
  const handleFilterChange = (filter: CommentFiltersType) =>
    setCommentsSearchState({ ...commentsSearchState, filter })
  const handleWithBlindChange = (checked: boolean) =>
    setCommentsSearchState({ ...commentsSearchState, withBlind: checked })

  return {
    filter,
    keyword,
    withBlind,
    handleKeywordChange,
    handleFilterChange,
    handleWithBlindChange,
  }
}
