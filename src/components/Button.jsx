import React from 'react'

const Button = ({
  text,
  type,
  color = "bg-slate-600" ,
  textColor = "text-white",
  className =" w-full",
  ...props

}) => {
  return (
    <div className='w-full flex justify-center items-center m-2 ' >

          <button
             type='text'
              className={`${className} ${color} ${textColor} py-2 px-4 rounded hover:opacity-90 font-semibold`}
                {...props}
          >
              {text}

          </button>  
    </div>
         )
      }

export default Button;