import React from "react"
import { Form, Link, redirect } from "react-router-dom"
import { FormInput, SubmitBtn } from "../components"
import { customFetch } from "../../utils"
import { toast } from "react-toastify"

// form action
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post("/auth/local/register", data)
    console.log(response.data)
    toast.success("Account created successfully")
    return redirect("/login")
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "Please double check your connection"
    toast.error(errorMessage)
    return null
  }
}

const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='POST'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput
          type='text'
          label='Username'
          name='username'
          defaultValue='haba babi'
        />
        <FormInput
          type='email'
          label='Email'
          name='email'
          defaultValue='habababi@gmail.com'
        />
        <FormInput
          type='password'
          label='Password'
          name='password'
          defaultValue='secret123'
        />
        <div className='mt-4'>
          <SubmitBtn text='register' />
        </div>
        <p className='text-center mt-3'>
          Already a member?
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Register
