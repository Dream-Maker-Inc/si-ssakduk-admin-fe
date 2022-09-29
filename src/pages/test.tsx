import type { NextPage } from 'next'

import type { UploadFile } from 'antd/es/upload/interface'
import { useState } from 'react'
import { LocalUploadView } from '@/common/components/antd/uploads'
import { AntdUploadFileManager } from '../common/components/antd/uploads/helper/AntdUploadFileManager'

const TestPage: NextPage = () => {
  const [files, setFiles] = useState<UploadFile[]>([])

  const antdUploadFileManager = new AntdUploadFileManager(files)
  antdUploadFileManager.toFiles().then(files => console.log(files))

  return (
    <div>
      <LocalUploadView
        files={files}
        onChange={files => setFiles(files)}
        maxSize={5}
        multiple
      />
    </div>
  )
}

export default TestPage
