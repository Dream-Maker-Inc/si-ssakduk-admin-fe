export class UpdateLifePostingDto {
  constructor(
    public title: string,
    public content: string,
    public link: string,
    public attachments?: File[],
  ) {}

  toFormData() {
    const fd = new FormData()
    fd.append('title', this.title)
    fd.append('content', this.content)
    fd.append('link', this.link)

    this.attachments?.forEach(file => fd.append('attachments', file))

    return fd
  }
}
