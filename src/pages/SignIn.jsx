import React, { useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Link, useNavigate } from 'react-router-dom'
import HabeshaLogo from '../assets/images/HabeshaLogo.jpeg'
import api from '../componets/api/api'

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [errEmail, setErrEmail] = useState("")
  const [errPassword, setErrPassword] = useState("")
  const [errRole, setErrRole] = useState("")

  const navigate = useNavigate()

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setErrEmail('')
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setErrPassword('')
  }

  const handleRole = (e) => {
    setRole(e.target.value)
    setErrRole('')
  }

  const emailValidation = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const handleSignIn = async (e) => {
  e.preventDefault()

  let isValid = true

  if (!email) {
    setErrEmail("Enter Your Email")
    isValid = false
  } else if (!emailValidation(email)) {
    setErrEmail('Enter valid email')
    isValid = false
  }

  if (!password) {
    setErrPassword("Enter your password")
    isValid = false
  } else if (password.length < 6) {
    setErrPassword("Password must be at least 6 characters")
    isValid = false
  }

  if (!role) {
    setErrRole("Please select your role")
    isValid = false
  }

  if (!isValid) return

  try {
    const response = await api.post('/auth/login', {
      email,
      password,
      role
    })

    const user = response.data
    localStorage.setItem('user', JSON.stringify(user))

    // Navigate based on role
    if (user.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
    }

  } catch (error) {
    const msg = error.response?.data?.message || "Login failed"
    setErrEmail(msg)
  }
}
  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        <form className='w-[350px] mx-auto flex flex-col items-center'>

          <img className='w-46 py-4 rounded-t-md' src={HabeshaLogo} alt="logo" />
          <div className='w-full border border-zinc-200 p-6'>
            <h2 className='font-titleFont text-3xl mb-4 '>Sign In</h2>
            <div className='flex flex-col gap-3'>
              {/* Email */}
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium pb-2'>Email </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100'
                  type="email"
                />
                {errEmail && (
                  <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                    <span className='italic font-titleFont font-semibold text-base'>!</span>{errEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium pb-2'>Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100'
                  type="password"
                />
                {errPassword && (
                  <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                    <span className='italic font-titleFont font-semibold text-base'>!</span>{errPassword}
                  </p>
                )}
              </div>

              {/* Role Dropdown */}
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium pb-2'>Select Role</p>
                <select
                  onChange={handleRole}
                  value={role}
                  className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100'
                >
                  <option value="">-- Select Role --</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errRole && (
                  <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                    <span className='italic font-titleFont font-semibold text-base'>!</span>{errRole}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSignIn}
                className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-habeshaInput'
              >
                Continue
              </button>
            </div>

            <p className='text-xs text-black leading-4 mt-4'>
              By continuing, you agree to Habesha's <span className='text-blue-600'>Conditions of Use</span> and <span className='text-blue-600'>Privacy Notice</span>.
            </p>
            <p className='text-xm text-gray-600 mt-4 cursor-pointer group'>
              <ArrowRightIcon />
              <span className='text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1'>Need Help?</span>
            </p>
          </div>

          <p className='w-full text-xs text-gray-600 mt-4 flex items-center'>
            <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
            <span className='w-1/3 text-center'>New to Habesha?</span>
            <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
          </p>

          <Link className='w-full' to='/Regestration'>
            <button className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-habeshaInput'>
              Create Your Account
            </button>
          </Link>
        </form>
      </div>

      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
        <div className='flex items-center gap-6'>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer'>Conditions of Use</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer'>Privacy Notice</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer'>Help</p>
        </div>
        <p className='text-xs text-gray-600 '>2025, ReactBd, Inc. or its affiliates</p>
      </div>
    </div>
  )
}

export default SignIn
