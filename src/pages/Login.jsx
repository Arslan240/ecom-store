import React, { useState } from "react"
import { FormInput, SubmitBtn } from "../components"
import { Form, Link, redirect, useNavigate } from "react-router-dom"
import { customFetch } from "../../utils"
import { toast } from "react-toastify"
import { loginUser } from "../features/user/userSlice"
import { useDispatch } from "react-redux"

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      const response = await customFetch.post("/auth/local", data)
      store.dispatch(loginUser(response.data))
      toast.success("Logged in Successfully")
      return redirect("/")
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your connection"
      toast.error(errorMessage)
      return null
    }

    console.log(store)
    return null
  }

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const loginAsGuestUser = async () => {
    setLoading(true)
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      })
      dispatch(loginUser(response.data))
      toast.success("Welcome Guest User")
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Guest user login Error. Please login")
    }
    setLoading(false)
  }

  return (
    <section className='h-screen grid place-items-center'>
      <Form
        className='card w-96 bg-base-100 shadow-lg flex flex-col gap-y-4 p-8'
        method='POST'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput
          type='email'
          label='Email'
          name='identifier'
          defaultValue='habababi@gmail.com'
        />
        <FormInput
          type='password'
          label='Password'
          name='password'
          defaultValue='secret123'
        />

        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>
        <button
          type='button'
          onClick={loginAsGuestUser}
          disabled={loading}
          className='btn btn-secondary btn-block uppercase'
        >
          {loading ? (
            <span className='loading loading-spinner'></span>
          ) : (
            <>Guest User</>
          )}
        </button>
        <p className='text-center'>
          Not a member yet?{" "}
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Login
