import { BaseModelWithBlind } from '@/data/common'
import placeHolder from '@/images/place-holder.jpg'

export class MemberDto extends BaseModelWithBlind {
  id: number
  email: string
  nickname: string
  name: string
  birthDay: string
  phone: string
  private profileImageUrl: string

  get profileImage() {
    return this.profileImageUrl || placeHolder
  }
}
