import React from 'react'
import QueryForm from './QueryForm'

const Service = () => {
  return (
    <div className='mx-8 md:mx-16 lg:mx-32 xl:mx-96 mt-5 md:mt-5'>
      <h2 className='text-[#103948] text-2xl lg:text-5xl mb-8'>Terms of Service</h2>
      <div className="text-gray-500">
        <p className='font-bold mb-2'>PTerms of Service</p>
        <p>Welcome to Makextra! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully. If you do not agree with these terms, you should not use our website.</p>
        <p className='font-bold mb-2 mt-4'>1. General Terms</p>
        <p>Makextra provides fashion products and services as described on our website. All information, including product descriptions, images, and prices, is provided "as is" without any warranties of accuracy or completeness.</p>
        <p className='font-bold mb-2 mt-4'>2. Use of Site</p>
        <p>You agree to use Makextra’s site only for lawful purposes and in a way that does not infringe the rights of others or restrict or inhibit anyone else's use of the site.</p>
        <p className='font-bold mb-2 mt-4'>3. Orders and Payment</p>
        <p >By placing an order, you agree to purchase the selected items in accordance with our pricing, availability, and payment terms. All payments must be completed at checkout, and we reserve the right to cancel any order for any reason.</p>
        <p className='font-bold mb-2 mt-4'>4. Return and Refund Policy</p>
        <p>Our Return and Refund Policy governs the return process. Please refer to our dedicated Returns page for detailed instructions and conditions.</p>
        <p className='font-bold mb-2 mt-4'>5. Intellectual Property</p>
        <p>All content on Makextra, including but not limited to images, text, and design, is the property of Makextra and protected by intellectual property laws.</p>
        <p className='font-bold mb-2 mt-4'>6. Limitation of Liability</p>
        <p>Makextra shall not be liable for any direct or indirect damages arising from your use of the site or inability to access it.</p>
        <p className='font-bold mb-2 mt-4'>7. Changes to Terms</p>
        <p>Makextra reserves the right to update these Terms of Service at any time. Your continued use of the site constitutes acceptance of any changes.</p>
        <p className='mt-6'>For any questions regarding these terms, please contact us at [your contact email].</p>
      </div>
      
      <QueryForm />
    </div>
  )
}

export default Service