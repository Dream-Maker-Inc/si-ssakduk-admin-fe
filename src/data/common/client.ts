import axios from 'axios'
import { ServerInfo, TempToken } from 'env'

const BaseServerClient = axios.create({
  baseURL: ServerInfo.host,
})

// BaseServerClient.interceptors.request.use(req => {
//   req.headers = {
//     Authorization: 'Bearer ' + TempToken,
//   }

//   return req
// })

const setAxiosAccessToken = (accessToken: string) => {
  BaseServerClient.interceptors.request.use(req => {
    req.headers = {
      Authorization: 'Bearer ' + accessToken,
    }

    return req
  })
}

export { BaseServerClient, setAxiosAccessToken }
