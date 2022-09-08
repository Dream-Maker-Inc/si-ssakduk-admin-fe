class QueryRouter {
  constructor(public value: string, public path: string) {}
}

class QueryDetailRouter {
  constructor(public value: string, private originPath: string) {}

  createPath(id: string) {
    return `${this.originPath}/${id}`
  }
}

class MutateRouter {
  constructor(
    public value: string,
    private originPath: string,
    private commandPath: 'create' | 'update' | 'delete',
  ) {}

  createPath(id: string) {
    return `${this.originPath}/${id}/${this.commandPath}`
  }
}

export const RouterPath = {
  Root: new QueryRouter('root', '/'),

  Main: new QueryRouter('main', '/main'),
  MainUpdate: new QueryRouter('main update', '/main/update'),

  Members: new QueryRouter('회원 관리', '/members'),
  Member: new QueryDetailRouter('회원 상세', '/members'),
  MemberDelete: new MutateRouter('회원 삭제', '/members', 'delete'),

  LeavedMembers: new QueryRouter('탈퇴 회원 관리', '/members/leaved'),
  LeavedMember: new QueryDetailRouter('탈퇴 회원 상세', '/members/leaved'),

  ServiceTerms: new QueryRouter('약관 관리', '/service-terms'),
  ServiceTerm: new QueryDetailRouter('약관 상세', '/service-terms'),
  ServiceTermUpdate: new MutateRouter('약관 수정', '/service-terms', 'update'),
  ServiceTermDelete: new MutateRouter('약관 삭제', '/service-terms', 'delete'),

  Postings: new QueryRouter('게시글 관리', '/postings'),
  Posting: new QueryDetailRouter('게시글 상세', '/postings'),
  PostingDelete: new MutateRouter('게시글 삭제', '/postings', 'delete'),

  LifePostings: new QueryRouter('라이프 관리', '/life'),
  LifePosting: new QueryDetailRouter('라이프 상세', '/life'),
  LifePostingCreate: new MutateRouter('라이프 생성', '/life', 'create'),
  LifePostingUpdate: new MutateRouter('라이프 수정', '/life', 'update'),
  LifePostingDelete: new MutateRouter('라이프 삭제', '/life', 'delete'),
}

export type RouterPathType = typeof RouterPath[keyof typeof RouterPath]
