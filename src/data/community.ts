import { member } from '@/data/member'

const enum Category {
  Company = '직장 폭력',
  Dating = '데이트 폭력',
  School = '학교 폭력',
  Home = '가정 폭력',
  Gender = '성폭력',
  Cyber = '사이버 폭력',
  Sad = '우울증',
  Secret = '비밀',
  Hobby = '취미 공유',
  Question = '고민',
  Etc = '기타',
}

export const community = [
  {
    id: 1,
    authorId: member[0].idx,
    category: Category.Company,
    title: '첫 번째 포스트',
    content: '첫 번째 포스트의 컨텐츠입니다.',
    likedCount: 1000,
    viewCount: 2000,
    attachments: [
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    ],
    regDate: new Date(2022, 11, 11).toLocaleDateString(),
    updateDate: new Date(2022, 12, 12).toLocaleDateString(),
    isVisible: true,
  },

  {
    id: 2,
    authorId: member[1].idx,
    category: Category.Company,
    title: '두 번째 포스트',
    content: '두 번째 포스트의 컨텐츠입니다.',
    likedCount: 1000,
    viewCount: 2000,
    attachments: [
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    ],
    regDate: new Date(2022, 11, 11).toLocaleDateString(),
    updateDate: new Date(2022, 12, 12).toLocaleDateString(),
    isVisible: true,
  },

  {
    id: 3,
    authorId: member[2].idx,
    category: Category.Company,
    title: '세 번째 포스트',
    content: '세 번째 포스트의 컨텐츠입니다.',
    likedCount: 1000,
    viewCount: 2000,
    attachments: [
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    ],
    regDate: new Date(2022, 11, 11).toLocaleDateString(),
    updateDate: new Date(2022, 12, 12).toLocaleDateString(),
    isVisible: true,
  },

  {
    id: 4,
    authorId: member[3].idx,
    category: Category.Company,
    title: '네 번째 포스트',
    content: '네 번째 포스트의 컨텐츠입니다.',
    likedCount: 1000,
    viewCount: 2000,
    attachments: [
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    ],
    regDate: new Date(2022, 11, 11).toLocaleDateString(),
    updateDate: new Date(2022, 11, 11).toLocaleDateString(),
    isVisible: true,
  },
]
