import type { NextPage } from 'next'

import { Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'

type UploadCompType = {
  files: File[]
  onChange: (files: File[]) => void
}

let id = 0

const UploadComp = ({ files, onChange }: UploadCompType) => {
  const fileList: UploadFile[] = files.map(it => ({
    uid: `${id++}`,
    name: it.name,
    status: 'done',
    url: URL.createObjectURL(it),
  }))

  console.log(fileList)

  const isUrlType = (file: UploadFile) => !!file.url
  const isOriginFileType = (file: UploadFile) => !!file.originFileObj
  const createFileByUrl = async (
    url: string,
    filename: string,
    type: string,
  ) => {
    const res = await fetch(url)
    const blob = await res.blob()
    return new File([blob], filename, { type })
  }

  const handleFileChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    if (!newFileList) return

    const pendingFiles = newFileList.map(it => {
      if (isUrlType(it)) {
        return createFileByUrl(it.url ?? '', it.name, 'image/png')
      } else {
        return new Promise<File>(resolve =>
          resolve(
            new File([it.originFileObj as Blob], it.name, { type: it.type }),
          ),
        )
      }
    })

    Promise.all(pendingFiles).then(files => onChange(files))
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  console.log('asd')

  return (
    <Upload
      listType='picture-card'
      fileList={fileList}
      multiple
      onChange={handleFileChange}
      onPreview={onPreview}
    >
      {fileList.length < 5 && '+ Upload'}
    </Upload>
  )
}

const TestPage: NextPage = () => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div>
      <UploadComp files={files} onChange={files => setFiles(files)} />
    </div>
  )
}

export default TestPage
