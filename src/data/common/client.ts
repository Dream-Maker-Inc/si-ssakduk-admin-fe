import axios from 'axios'
import { ServerInfo } from 'env'

export const BaseServerClient = axios.create({
  baseURL: ServerInfo.host,
})
