import React from 'react';

interface InputProps{
  id: string
  name: string
  label: string
  placeholder: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => void
    error: boolean
    errorMessage: string | undefined
}

const Input = ({id, name, label, placeholder, value, onChange, error, errorMessage='', ...props }: InputProps) => {
  return (
    <div className="w-full pt-10">
      <label className="block text-sm text-gray-900" htmlFor={id}>{label}</label>
      <input autoComplete="off" 
      value={value}
      onChange={onChange}
      type="text"
      id={id} 
      name={name} 
      placeholder={placeholder} 
      {...props}
      className="w-full text-gray-900 placeholder-gray-400 border-gray-500 rounded-lg"/>
      {error ? <p className="text-red-500 italic text-sm">*{errorMessage}</p> : null}
    </div>
  )
}

export default Input;