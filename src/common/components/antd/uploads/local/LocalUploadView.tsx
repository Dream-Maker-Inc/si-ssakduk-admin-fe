import { Upload } from 'antd'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

type LocalUploadViewProps = {
  files: UploadFile[]
  onChange: (files: UploadFile[]) => void
  maxSize?: number
  multiple?: boolean
}
export const LocalUploadView = ({
  files,
  onChange,
  maxSize = 1,
  multiple = false,
}: LocalUploadViewProps) => {
  const handleFileChange: UploadProps['onChange'] = ({ fileList: files }) => {
    if (!files) return

    onChange(files.map(it => ({ ...it, status: 'done' })))
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

  return (
    <Upload
      listType='picture-card'
      multiple={multiple}
      fileList={files}
      onChange={handleFileChange}
      onPreview={onPreview}
    >
      {files.length < maxSize && '+ Upload'}
    </Upload>
  )
}
