class Router {
  constructor(public path: string) {}

  createPathWithId(id: string) {
    return `${this.path}?id=${id}`
  }
}

export const RouterPath = {
  Root: new Router('/'),

  Main: new Router('/main'),
  MainUpdate: new Router('/main/update'),

  Members: new Router('/members'),
  Member: new Router('/members/detail'),
  MemberDelete: new Router('/members/delete'),

  ServiceTerms: new Router('/service-terms'),
  ServiceTerm: new Router('/service-terms/detail'),
  ServiceTermCreate: new Router('/service-terms/create'),
  ServiceTermUpdate: new Router('/service-terms/update'),
  ServiceTermDelete: new Router('/service-terms/delete'),

  Postings: new Router('/postings'),
  Posting: new Router('/postings/detail'),

  Comments: new Router('/comments'),

  LifePostings: new Router('/life'),
  LifePosting: new Router('/life/detail'),
  LifePostingCreate: new Router('/life/create'),
  LifePostingUpdate: new Router('/life/update'),
  LifePostingDelete: new Router('/life/delete'),

  Login: new Router('/login'),
}

export type RouterPathType = typeof RouterPath[keyof typeof RouterPath]
