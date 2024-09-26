# Adding form and Slug Values
1. Set-up the `RTE.jsx` it is real time editor
     - go to its documenetation to use it
```javascript 
       //RTE=Real Time Editor
import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
export default function RTE() {
  return (
    <Editor
    initialValue='default value'
    init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
// kar to ese bhi skte haain but the proclem is the RTE will be operating other place and it is difficult to manage its operations in react (i.e. navigate krke udhr jaa to skte hain but fir prob hogi, so will do it other way)
  )
}
```
- so will use react-form hook controller