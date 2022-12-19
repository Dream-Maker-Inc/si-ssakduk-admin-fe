import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

type User = {
  accessToken: string
}

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: sessionStorage,
})

const userAtom = atom<User>({
  key: 'user',
  default: { accessToken: '' },
  effects_UNSTABLE: [persistAtom],
})

export const useUserAuthentication = () => {
  const [user, setUser] = useRecoilState(userAtom)

  const removeUser = () => sessionStorage?.removeItem('user')

  return {
    user,
    setUser,
    removeUser,
  }
}
