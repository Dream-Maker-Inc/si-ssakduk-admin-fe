export class PostingCategory {
  constructor(public label: string, public value: string) {}
}

export const PostingCategories = {
  All: new PostingCategory('전체', ''),
  CorporateViolence: new PostingCategory('직장 폭력', '직장 폭력'),
  DateViolence: new PostingCategory('데이트 폭력', '데이트 폭력'),
  SchoolViolence: new PostingCategory('학교 폭력', '학교 폭력'),
  DomesticViolence: new PostingCategory('가정 폭력', '가정 폭력'),
  SexualViolence: new PostingCategory('성폭력', '성폭력'),
  CyberViolence: new PostingCategory('사이버 폭력', '사이버 폭력'),
  Depression: new PostingCategory('우울증', '우울증'),
  Secret: new PostingCategory('비밀', '비밀'),
  Hobby: new PostingCategory('취미 공유', '취미 공유'),
  Worry: new PostingCategory('고민', '고민'),
  Misc: new PostingCategory('기타', '기타'),
}

export const findPostingCategories = (label: string) =>
  Object.values(PostingCategories).find(it => it.label === label)

export const findPostingCategoriesByValue = (v: string) =>
  Object.values(PostingCategories).find(it => it.value === v)

export type PostingCategoriesType =
  typeof PostingCategories[keyof typeof PostingCategories]
