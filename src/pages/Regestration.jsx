import React, { useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Link } from 'react-router-dom'
import HabeshaLogo from '../assets/images/HabeshaLogo.jpeg'
import api from '../componets/api/api'


const Regestration = () => {
   //error message
   const[errClientName,setErrClientName] = useState("")
   const[errEmail,setErrEmail] = useState("")
   const[errPassword,setErrPassword] = useState("")
   const[errCPassword,setErrCPassword] = useState("")
 

  const[clientName,setClientName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[cPassword,setCPassword] = useState("")

//handle function
  const handleName=(e)=>{
    setClientName(e.target.value)
    setErrClientName('')
  }

 const handleEmail=(e)=>{
  setEmail(e.target.value)
  setErrEmail('')
 }

 const handlePassword=(e)=>{
  setPassword(e.target.value)
  setErrPassword('')
 }

 const handleCPassword=(e)=>{
  setCPassword(e.target.value)
  setErrCPassword('')
 }

 //email validation
 const emailValidation = (email)=>{
  return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
 }

  const handleRegistration = async (e) => {
  e.preventDefault()

  if (!clientName) setErrClientName("Enter Your name")
  if (!email) setErrEmail("Enter Your Email")
  else if (!emailValidation(email)) setErrEmail("Enter valid email")
  if (!password) setErrPassword("Enter your password")
  else if (password.length < 6) setErrPassword("Password must be at least 6 characters")
  if (!cPassword) setErrCPassword("Confirm your password")
  else if (password !== cPassword) setErrCPassword("Passwords don't match")

  const isValid = clientName && emailValidation(email) && password.length >= 6 && password === cPassword

  if (!isValid) return

  try {
    await api.post('/auth/register', {
      name: clientName,
      email,
      password,
      role: 'user' // default role
    })

    alert("Registration successful. Please sign in.")
    setClientName('')
    setEmail('')
    setPassword('')
    setCPassword('')

  } catch (error) {
    const msg = error.response?.data?.message || "Registration failed"
    setErrEmail(msg)
  }
}
  return (
    <div className='w-full'>
   <div className='w-full bg-gray-100 pb-10'>
   <form className='w-[370px] mx-auto flex flex-col items-center'>
   <img className='w-46 py-4 rounded-t-md' src={HabeshaLogo} alt="logo" />
   <div className='w-full border border-zinc-200 p-6'>
    <h2 className='font-titleFont text-3xl font-medium mb-4'>
     Create Account
    </h2>
   <div className='flex flex-col gap-3'>
   <div className='flex flex-col gap-2'>
   <p className='text-sm font-medium'>Your name</p>
   <input 
   value={clientName}
   onChange={handleName}
   className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100' type="text" />  
   {
    errClientName && (
      <p className='text-red-600
       text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-semibold text-base'>!</span>{errClientName}</p>
    )
   }           
    </div>
    <div className='flex flex-col gap-2'>
   <p className='text-sm font-medium'>Email or Phone number</p>
   <input
   value={email}
   onChange={handleEmail}
    className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100' type="email" />  
   {
    errEmail && (
      <p className='text-red-600
       text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-semibold text-base'>!</span>{errEmail}</p>
    )
   }            
    </div>
    <div className='flex flex-col gap-2'>
   <p className='text-sm font-medium'>Password</p>
   <input
   value={password}
   onChange={handlePassword}
   className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100' type="password" /> 
   {
    errPassword && (
      <p className='text-red-600
       text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-semibold text-base'>!</span>{errPassword}</p>
    )
   }             
    </div>
    <div className='flex flex-col gap-2'>
   <p className='text-sm font-medium'>Re-enter Password</p>
   <input
   value={cPassword}
   onChange={handleCPassword}
   className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100' type="password" /> 
    {
    errCPassword && (
      <p className='text-red-600
       text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-semibold text-base'>!</span>{errCPassword}</p>
    )
   } 
   {errEmail ? <></>:<p className='text-xs text-gray-600'>Password must be at least 6 characters</p>}
      
    </div>
    <button onClick={handleRegistration} className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-habeshaInput'>Continue</button>

    </div>
    <p className='text-xs text-black leading-4 mt-4'>By Creating, you agree to Habesha's <span className='text-blue-600'>Condition of Use {" "}</span> and 
    <span className='text-blue-600'>Privace Notice.</span></p>
    <div className='text-xs text-black'>
      <p className='mt-1'>Already have an account? 
        <Link to='/SignIn'>
        <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'> Sing in{" "} <span><ArrowRightIcon /></span></span>
        </Link>
      </p>
    </div>
    </div>
    </form>
    </div>
    <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
      <div className='flex items-center gap-6'>
        <p className='text-xs text-blue-600 group-hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Conditions of Use</p>
        <p className='text-xs text-blue-600 group-hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Conditions of Use</p>
        <p className='text-xs text-blue-600 group-hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Conditions of Use</p>
      </div>
      <p className='text-xs text-gray-600 '>2025, ReactBd, Inc. or its affiliates</p>
      </div>
    </div>
    
  )
}

export default Regestration
