import { useUserAuthentication } from '@/common/recoil'
import { RouterPath } from '@/common/router'
import { setAxiosAccessToken } from '@/data/common'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { LoginApi, RequestLoginDto } from '../data'
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

  const { setUser } = useUserAuthentication()

  const handleLoginSuccess = (accessToken: string) => {
    setUser({ accessToken })
    setAxiosAccessToken(accessToken)
    router.push(RouterPath.Members.path)
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
