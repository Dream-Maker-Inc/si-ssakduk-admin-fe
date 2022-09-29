import { UploadFile } from 'antd/es/upload/interface'

class AntdUploadFileHelper {
  private static inst: AntdUploadFileHelper

  private constructor() {
    return
  }

  public static get instance() {
    return this.inst || (this.inst = new this())
  }

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

  toFiles(uploadFiles: UploadFile[]) {
    const pendingFiles = uploadFiles.map(it => {
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

  fromFiles(files: File[]): UploadFile[] {
    let id = 0

    return files.map(it => ({
      uid: `${id++}_${new Date().getMilliseconds()}_${it.name}`,
      name: it.name,
      status: 'done',
      url: URL.createObjectURL(it),
    }))
  }

  fromUrls(urls: string[], type: string): UploadFile[] {
    let id = 0

    return urls.map(it => {
      const uid = `${id++}_${new Date().getMilliseconds()}`

      return {
        uid,
        name: uid,
        type,
        status: 'done',
        url: it,
      }
    })
  }
}

const antdUploadFileHelper = AntdUploadFileHelper.instance

export { antdUploadFileHelper }
