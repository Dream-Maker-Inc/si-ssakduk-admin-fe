interface MemberDto {
  id: number
  email: string
  nickname: string
  name: string
  birthDay: string
  phone: string
  profileImageUrl: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export type { MemberDto }
