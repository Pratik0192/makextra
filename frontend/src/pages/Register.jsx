import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Register = () => {

  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, SetMobile] = useState("");

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/user/register', {name, password, email, mobile_number: mobile});
      if(response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-7 md:mt-14 mb-14 gap-4'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='text-3xl'>Register</p>
      </div>
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full px-3 py-2 border-2 border-gray-300'/>
      <input onChange={(e) => SetMobile(e.target.value)} value={mobile} type="number" placeholder='Mobile Number' required className='w-full px-3 py-2 border-2 border-gray-300'/>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' required className='w-full px-3 py-2 border-2 border-gray-300'/>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='w-full px-3 py-2 border-2 border-gray-300'/>
      <div className="w-full flex justify-between text-sm text-gray-600">
        <Link className='hover:undeline underline-offset-4' to='/login'>Already have an account?</Link>
      </div>
      <button className=' rounded-md cursor-pointer w-full text-white bg-[#8C1018] px-8 py-2'>Register</button>
    </form>
  )
}

export default Register