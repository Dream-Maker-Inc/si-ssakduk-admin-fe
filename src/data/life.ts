import { member } from '@/data/member'

export const life = [
  {
    id: 1,
    authorId: member[0].idx,
    title: '첫 번째 게시물',
    content: '첫 번째 게시물의 컨텐츠입니다.',
    viewCount: 2000,
    sponsorLink: 'https://www.naver.com',
    attachments: [
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    ],
    regDate: new Date(2022, 11, 11).toLocaleDateString(),
    updateDate: new Date(2022, 12, 12).toLocaleDateString(),
  },

  {
    id: 2,
    authorId: member[1].idx,
    title: '두 번째 게시물',
    content: '두 번째 게시물의 컨텐츠입니다.',
    viewCount: 2000,
    sponsorLink: 'https://www.naver.com',
    attachments: [
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    ],
    regDate: new Date(2022, 11, 11).toLocaleDateString(),
    updateDate: new Date(2022, 12, 12).toLocaleDateString(),
  },

  {
    id: 3,
    authorId: member[2].idx,
    title: '세 번째 게시물',
    content: '세 번째 게시물의 컨텐츠입니다.',
    viewCount: 2000,
    sponsorLink: 'https://www.naver.com',
    attachments: [
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    ],
    regDate: new Date(2022, 11, 11).toLocaleDateString(),
    updateDate: new Date(2022, 12, 12).toLocaleDateString(),
  },

  {
    id: 4,
    authorId: member[3].idx,
    title: '네 번째 게시물',
    content: '네 번째 게시물의 컨텐츠입니다.',
    viewCount: 2000,
    sponsorLink: 'https://www.naver.com',
    attachments: [
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    ],
    regDate: new Date(2022, 11, 11).toLocaleDateString(),
    updateDate: new Date(2022, 11, 11).toLocaleDateString(),
  },
]
