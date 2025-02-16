import React from 'react'
import QueryForm from '../components/QueryForm'

const ContactUs = () => {
  return (
    <div className='mx-2 md:mx-4 lg:mx-8 xl:mx-96 mt-5 md:mt-5'>
      <h2 className='text-2xl lg:text-5xl mb-8'>Contact Us</h2>
      <div className='text-gray-500 mt-4 flex flex-col gap-2'>
        <p>Customer is our first priority. If you have any questions for us, fill out the form below with all of our details and we'll get back to you within 24 hours Or feel free to reach out to us at:</p>
      </div>

      <div className='text-gray-500 mt-4 flex flex-col gap-4'>
        <p className='font-bold text-gray-600'>CUSTOMER CARE:</p>
        <p><span className='font-bold text-gray-600'>Email: </span> help@Karuna.in</p>
        <p><span className='font-bold text-gray-600'>Whatsapp Number: </span> +91 9330597272</p>
      </div>
      <QueryForm />
    </div>
  )
}

export default ContactUs