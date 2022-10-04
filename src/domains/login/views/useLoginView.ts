import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { LoginApi, RequestLoginDto } from '../data'
import { useRecoilState } from 'recoil'
import { userAtom } from '@/common/recoil'
import { RouterPath } from '@/common/router'
export const useLoginView = () => {
  const router = useRouter()

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const { mutate: requestLogin } = useMutation(
    (dto: RequestLoginDto) => LoginApi.login(dto),
    {
      onSuccess: res => handleLoginSuccess(res.accessToken),
      onError: (err: AxiosError) => {
        console.error(err)
        alert(`로그인 실패 했습니다. ${err.code}`)
      },
    },
  )

  const [_, setUser] = useRecoilState(userAtom)

  const handleLoginSuccess = (accessToken: string) => {
    setUser({ accessToken })
    router.push(RouterPath.Main.path)
  }

  const handleLogin = () => {
    const dto = new RequestLoginDto(id, pw)
    requestLogin(dto)
  }

  return {
    idState: {
      value: id,
      onChange: (v: string) => setId(v),
    },
    pwState: {
      value: pw,
      onChange: (v: string) => setPw(v),
    },
    signInState: {
      disabled: !id || !pw,
      onClick: handleLogin,
    },
  }
}
