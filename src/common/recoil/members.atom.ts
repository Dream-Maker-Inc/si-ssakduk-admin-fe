import { atom } from 'recoil'

export const membersSearchAtom = atom({
  key: 'membersFilterState',
  default: {
    keyword: '',
    mode: '활동 유저',
  },
})
