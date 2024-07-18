import React, {forwardRef, useId} from 'react'



function Select({
    options,
    label,
    className ="w-full",
    ...props
}, ref) {

    const id = useId()
  return (
    <div className='w-full flex flex-col '>
        {label && <label className="inline-block py-2" htmlFor={id} >{label}</label>}
        <select name="options" id={id} className='outline outline-[1.5px] bg-gray-50 rounded p-2 ' 
        ref={ref}
        {...props}
        >
       { options?.map((option) => (
        <option
          key={option}
          value={option}    
          className={className}
      
        >
        {option}

        </option>
       ))}
          
        </select>
        
    </div>
  )
}

export default forwardRef(Select)