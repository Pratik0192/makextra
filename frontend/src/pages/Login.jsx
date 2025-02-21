import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {

  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/user/login', {email, password});
      console.log(response.data);
      if(response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message)
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
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 mb-14'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='text-3xl'>Login</p>
      </div>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' required className='w-full px-3 py-2 border-2 border-gray-300'/>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='w-full px-3 py-2 border-2 border-gray-300'/>
      <div className="w-full flex justify-between text-sm text-gray-600">
        <p className='hover:underline underline-offset-4'>Forgot your Password?</p>
        <Link className='hover:undeline underline-offset-4' to='/register'>Create Account</Link>
      </div>
      <button className=' rounded-md cursor-pointer w-full text-white bg-[#8C1018] px-8 py-2'>Sign In</button>
    </form>
  )
}

export default Login