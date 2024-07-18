// import React from 'react'
// import {Editor} from "@tinymce/tinymce-react" 
// import {Controller} from 'react-hook-form'


// function RTE({
//     name= "RTE",
//     label,
//     control,
//     defaultValue = "",
//    ...props

// })

// {
//   return (
//       <div className='w-full'>
//         {label && <label className='inline-block mb-1 pl-1'>
//             {label}
//         </label>}
//         <Controller
//          name={name || "content"}
//          control={control}
//          render={({filed:{onChange}}) => (
//             <Editor
//               initialValue={initialValue}
//               init={{
//                 height: 500,
//                 initialValue: initialValue,
//                 menubar: true,
//                 plugins: [
//                    'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
//                    'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
//                    'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
//                 ],
//                 toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
//                    'alignleft aligncenter alignright alignjustify | ' +
//                    'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
//                 content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//                 }}
//                 onEditorChange={onChange}
//             />

//          )}

//         />

    
//     </div>
//   )
// }

// export default RTE;


// chat gpt
import React from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from 'react-hook-form';

function RTE({
  name = "content",
  label,
  control,
  defaultValue = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
           apiKey='892y88eewrgh79rq196zp9ijdlfztyojt19nzp63d9aae1vx'
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
              content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }'
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
