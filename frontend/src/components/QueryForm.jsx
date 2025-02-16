import React from 'react'

const QueryForm = () => {
  return (
    <form className='pb-10 pt-8 mt-6'>
      <div className="flex gap-6">
        <input className='border border-gray-300 px-4 py-2 w-full' type="text" placeholder='Name'/>
        <input className='border border-gray-300 px-4 py-2 w-full' type="text" placeholder='Email'/>
      </div>
      <input className='border border-gray-300 px-4 py-2 w-full mt-4' type="number" placeholder='Phone number'/>
      <textarea className='border border-gray-300 px-4 py-2 w-full mt-4' placeholder='Comment'/>
      <button className='bg-gradient-to-r from-[#560e13] to-[#8c1018] text-[white] px-10 py-3 text-sm rounded-lg mt-8'>Send</button>
    </form>
  )
}

export default QueryForm