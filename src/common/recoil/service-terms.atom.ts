import { atom, useRecoilState } from 'recoil'

export const ServiceTermsSearchAtom = atom({
  key: 'serviceTermsFilterState',
  default: {
    keyword: '',
    withDeleted: false,
  },
})

export const useServiceTermsSearchState = () => {
  const [state, setState] = useRecoilState(ServiceTermsSearchAtom)
  const { keyword, withDeleted } = state

  const handleKeywordChange = (v: string) => setState({ ...state, keyword: v })
  const handleWithDeletedChange = (checked: boolean) =>
    setState({ ...state, withDeleted: checked })

  return {
    keyword,
    withDeleted,
    handleKeywordChange,
    handleWithDeletedChange,
  }
}
