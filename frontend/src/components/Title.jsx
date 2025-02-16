import React from 'react'

const Title = ({text}) => {
  return (
    <div className='inline-flex items-center mb-3'>
      <h2 className='text-[#8C1018] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>{text}</h2>
    </div>
  )
}

export default Title