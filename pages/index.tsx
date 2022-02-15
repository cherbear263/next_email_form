import type { NextPage } from 'next'
import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import { validate } from '../utils/validate'
import { stringify } from 'querystring'


const Home: NextPage = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<{name?: string; email?:string; message?:string}>({})

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors = validate(values)
    const isError = Object.keys(errors).length
    if(isError && isError > 0){
      setErrors(errors)
      return;
    }
    try {
      const res= await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if(!res.ok) {
        setValues({name: '', message: '', email: ''})
      }
    } catch(error) {
      console.log(error)

    }
    console.log(values)
    // automatically close the modal and success notification required.
    return;
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({...prev, [e.target.name]: e.target.value}))

  }
  return (
    <div className="w-full h-screen bg-blue-50">
      <div className="px-3">
        <h1 className="text-center text-slate-800 text-lg font-semibold pt-10">Contact me!</h1>
        <form className="flex flex-col items-center mx-auto w-1/3" onSubmit={handleSubmit}>
          <Input 
          error={!!errors.name}
          errorMessage={errors.name}
          value={values.name}
          onChange={onChange}
           id="name" name="name" label="enter your name" placeholder="your name"/>
          <Input 
          error={!!errors.email}
          errorMessage={errors.email}
          value={values.email}
          onChange={onChange}
          id="email" name="email" label="enter your email address" placeholder="your email address" />
          <Textarea 
          error={!!errors.message}
          errorMessage={errors.message}
          id="message" 
          name="message" 
          label="message" 
          placeholder="Hi there!"
          value={values.message}
          onChange={onChange}></Textarea>
          <button type="submit" className="w-full py-2 mt-6 text-lg text-white bg-purple-500 rounded-md
          active:bg-purple-600 focus:ring-2 focus:ring-purple-400 outline-none disabled:bg-opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default Home
