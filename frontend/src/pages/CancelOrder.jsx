import React from 'react'
import QueryForm from '../components/QueryForm'

const CancelOrder = () => {
  return (
    <div className='mx-2 md:mx-4 lg:mx-8 xl:mx-96 mt-5 md:mt-5'>
      <h2 className='text-2xl lg:text-5xl mb-8'>Cancel Your Order</h2>
      <div className='text-gray-500 mt-6 flex flex-col gap-2'>
        <p className='font-bold'>1. Cancellation Policy:</p>
        <p>● To cancel your order, please contact us <span className='font-bold'>within 24 hours</span> from the time of placing the order.</p>
        <p>● You can reach us by sending an email at <span className='font-bold'>help@Karuna.in</span> or a text message on WhatsApp <span className='font-bold'>(+91 9330597272)</span></p>
        <p>● Please include your <span className='font-bold'>ORDER ID</span> in the communication to ensure a smooth cancellation process.</p>
        <p className='font-bold'>● If you contact us after 24 hours or after the order has been shipped, we will not be able to cancel your order.</p>
      </div>

      <div className='text-gray-500 mt-6 flex flex-col gap-2'>
        <p className='font-bold'>2. Confirmation and Refund:</p>
        <p>● Once we receive your cancellation request and verify its eligibility, we will confirm the cancellation and initiate the refund process.</p>
        <p>● For prepaid orders, the refund will be processed in accordance with our refund policy, which may take <span className='font-bold'>5-7 working days.</span></p>
      </div>
      <QueryForm />
    </div>
  )
}

export default CancelOrder