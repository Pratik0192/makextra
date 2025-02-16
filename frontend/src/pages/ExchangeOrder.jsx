import React from 'react'
import QueryForm from '../components/QueryForm'

const ExchangeOrder = () => {
  return (
    <div className='mx-4 md:mx-8 lg:mx-16 xl:mx-96 mt-5 md:mt-5'>
      <h2 className='text-2xl lg:text-5xl mb-8'>Return or Exchange Request</h2>
      <div className='text-gray-500 mt-4 flex flex-col gap-2'>
        <p className='font-bold'>Return or Exchange Request</p>
        <p>At Karuna, we strive to make returns and exchanges as smooth as possible. If you need to request a return or exchange, please follow the steps below:</p>
      </div>

      <div className='text-gray-500 mt-6 flex flex-col gap-2'>
        <p className='font-bold'>1. Verify Eligibility:</p>
        <p>Before submitting a request, please ensure your item is eligible for return or exchange. Items must be unworn, unwashed, and in their original condition with tags attached. Final sale items and certain products, like undergarments, are not eligible.</p>
      </div>

      <div className="text-gray-500 mt-6 flex flex-col gap-2">
        <p className='font-bold'>2. Submit your Request</p>
        <p>To start a return or exchange, please contact our customer support at [your contact email] with the following information:</p>
        <p>● Your order number</p>
        <p>● Item(s) you wish to return or exchange</p>
        <p>● Reason for return or details of the requested exchange (e.g., size or color)</p>
      </div>

      <div className="text-gray-500 mt-6 flex flex-col gap-2">
        <p className='font-bold'>3. Return Shipping</p>
        <p>Upon approval of your request, we will provide return instructions. Please note that return shipping fees are typically the responsibility of the customer, unless there was an issue with the product received.</p>
      </div>

      <div className="text-gray-500 mt-6 flex flex-col gap-2">
        <p className='font-bold'>4. Processing Time</p>
        <p>Once your return or exchange is received, please allow [5-7 business days] for processing. Refunds, if applicable, will be issued to your original payment method.</p>
      </div>

      <div className="text-gray-500 mt-6 flex flex-col gap-2">
        <p className='font-bold'>Need Assistance?</p>
        <p>If you have any questions or need further assistance, don’t hesitate to reach out to us. We’re here to help ensure a seamless shopping experience!</p>
      </div>
      <QueryForm />
    </div>
  )
}

export default ExchangeOrder