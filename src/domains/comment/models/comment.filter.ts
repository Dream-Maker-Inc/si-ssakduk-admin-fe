class CommentFilter {
  constructor(public label: string, public value: string) {}
}

export const CommentFilters = {
  Content: new CommentFilter('내용', 'keyword'),
  PostingId: new CommentFilter('게시글 번호', 'postingId'),
  AuthorId: new CommentFilter('작성자 번호', 'authorId'),
}

export const findCommentFilter = (label: string) =>
  Object.values(CommentFilters).find(it => it.label === label)

export type CommentFiltersType =
  typeof CommentFilters[keyof typeof CommentFilters]
