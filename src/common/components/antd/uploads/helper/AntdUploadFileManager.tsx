import { UploadFile } from 'antd/es/upload/interface'

export class AntdUploadFileManager {
  constructor(public uploadFiles: UploadFile[]) {}

  isUrlType(file: UploadFile) {
    return !!file.url
  }

  isOriginFileType(file: UploadFile) {
    return !!file.originFileObj
  }

  async createFileByUrl(url: string, filename: string, type: string) {
    const res = await fetch(url)
    const blob = await res.blob()
    return new File([blob], filename, { type })
  }

  toFiles() {
    const pendingFiles = this.uploadFiles.map(it => {
      if (this.isUrlType(it)) {
        return this.createFileByUrl(it.url ?? '', it.name, 'image/png')
      }

      return new Promise<File>(resolve =>
        resolve(
          new File([it.originFileObj as Blob], it.name, { type: it.type }),
        ),
      )
    })

    return Promise.all(pendingFiles)
  }
}
