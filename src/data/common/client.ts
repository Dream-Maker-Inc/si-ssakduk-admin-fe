import axios from 'axios'
import { ServerInfo, TempToken } from 'env'

const BaseServerClient = axios.create({
  baseURL: ServerInfo.host,
})

BaseServerClient.interceptors.request.use(req => {
  const userJSON = window.sessionStorage.getItem('user') as any
  const userObj = JSON.parse(userJSON)
  const token = userObj?.user?.accessToken

  req.headers = {
    Authorization: 'Bearer ' + token,
  }

  return req
})

export { BaseServerClient }
