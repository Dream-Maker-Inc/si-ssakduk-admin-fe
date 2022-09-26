import { BaseModelWithBlind } from '@/data/common'

export class MemberDto extends BaseModelWithBlind {
  id: number
  email: string
  nickname: string
  name: string
  birthDay: string
  phone: string
  private profileImageUrl: string

  get profileImage() {
    return this.profileImageUrl || '/images/place-holder.jpg'
  }
}
