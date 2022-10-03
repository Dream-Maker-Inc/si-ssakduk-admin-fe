import { atom, useRecoilState } from 'recoil'

export const ServiceTermsSearchAtom = atom({
  key: 'serviceTermsFilterState',
  default: {
    keyword: '',
  },
})

export const useServiceTermsSearchState = () => {
  const [state, setState] = useRecoilState(ServiceTermsSearchAtom)
  const { keyword } = state

  const handleKeywordChange = (v: string) => setState({ ...state, keyword: v })

  return {
    keyword,
    handleKeywordChange,
  }
}
