import React, { useId, forwardRef } from "react";

export const Input = forwardRef(function Input(
  { 
    label, 
    className = "w-full", 
    type = "",
    placeholder = "",
  
    ...props 
    },
  ref
) {
  const id = useId();

  return (
    <div className="w-full p-2 flex flex-col ">
      {label && (
        <label className="py-2" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`rounded bg-slate-50 px-4 py-2 outline-0 
                    ring-black ring-1
                   placeholder:text-gray-400 ${className}`}
        id={id}
        type={type}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
});

export default Input;
