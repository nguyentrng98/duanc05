import { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Tiny({ initialValue, onChange }) {
  const editorRef = useRef(null);

  // Ghi lại nội dung hiện tại
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // Cập nhật nội dung trong editor mỗi khi initialValue thay đổi
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(initialValue); // Thiết lập nội dung mới cho editor
    }
  }, [initialValue]);

  return (
    <div className="w-full">
      <Editor
        apiKey='qke7hifjbdz3cr8otagvvvl38pmc7b3a5nccx2a4aq8j8re3'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={initialValue} // Có thể sử dụng để thiết lập giá trị ban đầu
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
        onEditorChange={onChange}
      />
    </div>
  );
}