import axios from 'axios'
import { ServerInfo, TempToken } from 'env'

const BaseServerClient = axios.create({
  baseURL: ServerInfo.host,
})

BaseServerClient.interceptors.request.use(req => {
  req.headers = {
    Authorization: 'Bearer ' + TempToken,
  }

  return req
})

export { BaseServerClient }
