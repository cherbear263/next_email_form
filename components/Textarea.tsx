import React from 'react';

interface TextAreaProps{
  id: string
  name: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)
   => void
   error: boolean
   errorMessage: string | undefined
}

const Textarea = ({id, name, label, placeholder, value, onChange, error, errorMessage="", }: TextAreaProps) => {
  return (
    <div className="w-full pt-10">
      <label className="block text-sm text-gray-900" htmlFor={id}>
        {label}
      </label>
      <textarea autoComplete="off" 
      id={id} 
      name={name} 
      rows={5}
      style={{resize: 'none'}}
      placeholder={placeholder}
      value={value}
      onChange={onChange} 
      className="w-full text-gray-900 placeholder-gray-400 border-gray-500 rounded-lg"></textarea>
      {error ? <p className="text-red-500 italic text-sm">*{errorMessage}</p> : null}
    </div>
  )
}

export default Textarea;