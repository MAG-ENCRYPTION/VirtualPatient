import { useState } from 'react'
import RichTextEditor from 'react-rte'

export const RichEditor = ({
  getContent,
  height = 300,
  placeholder = '',
}: {
  getContent: (value: string) => void
  height?: number | string
  placeholder: string
}) => {
  const [content, setContent] = useState(RichTextEditor.createEmptyValue())

  return (
    <RichTextEditor
      value={content}
      onChange={(e) => {
        setContent(e)
        getContent(e.toString('html'))
      }}
      rootStyle={{ height }}
      placeholder={placeholder}
    />
  )
}
