import { RequestLoginDto } from './dto/request-login.dto'
import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { ResponseLoginDto } from './dto'

export class LoginApi {
  static async login(dto: RequestLoginDto) {
    return await lastValueFrom(
      from(BaseServerClient.post('/api/v1/auth/admin/login', dto)).pipe(
        map(res => plainToClass(ResponseLoginDto, res.data.data)),
      ),
    )
  }
}
