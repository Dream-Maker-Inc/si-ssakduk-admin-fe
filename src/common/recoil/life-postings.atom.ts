import { atom, useRecoilState } from 'recoil'

export const LifePostingsSearchAtom = atom({
  key: 'lifePostingsFilterState',
  default: {
    keyword: '',
    withBlind: false,
  },
})

export const useLifePostingsSearchState = () => {
  const [state, setState] = useRecoilState(LifePostingsSearchAtom)
  const { keyword, withBlind } = state

  const handleKeywordChange = (v: string) => setState({ ...state, keyword: v })
  const handleWithBlindChange = (checked: boolean) =>
    setState({ ...state, withBlind: checked })

  return {
    keyword,
    withBlind,
    handleKeywordChange,
    handleWithBlindChange,
  }
}
