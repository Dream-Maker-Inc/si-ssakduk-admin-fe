interface MemberDto {
  id: number
  email: string
  nickname: string
  name: string
  birthDay: string
  phone: string
  profileImageUrl: string
  suspendedAt: Date
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export type { MemberDto }
