import React from 'react'
import QueryForm from '../components/QueryForm'

const ShippingPolicy = () => {
  return (
    <div className='mx-8 md:mx-16 lg:mx-32 xl:mx-96 mt-5 md:mt-5'>
      <h2 className='text-[#103948] text-2xl lg:text-5xl mb-8'>Shipping policy</h2>
      <div className="text-gray-500">
        <p className='font-bold mb-2'>Shipping Policy</p>
        <p>At Karuna, we aim to provide efficient and reliable shipping for all orders. Please review our shipping details below:</p>
        <p className='font-bold mb-2 mt-4'>1. Processing Time</p>
        <p>Orders are typically processed within [1-3 business days] after payment confirmation. During peak times or sales events, processing may take longer.</p>
        <p className='font-bold mb-2 mt-4'>2. Shipping Rates and Delivery Times</p>
        <p>Shipping costs and delivery times vary depending on your location and the shipping method selected at checkout. Standard shipping typically takes [5-7 business days], while expedited options may be available for quicker delivery.</p>
        <p className='font-bold mb-2 mt-4'>3. International Shipping</p>
        <p>We offer international shipping to select countries. Additional customs duties or taxes may apply depending on the destination country and are the responsibility of the recipient.</p>
        <p className='font-bold mb-2 mt-4'>4. Order Tracking</p>
        <p>Once your order has shipped, you’ll receive a tracking number via email to monitor the delivery status.</p>
        <p className='font-bold mb-2 mt-4'>5. Delays and Issues</p>
        <p>While we strive for timely delivery, Karuna is not responsible for delays caused by carriers, weather, customs processes, or other circumstances beyond our control. If your order is delayed, please contact our support team for assistance.</p>
        <p className='font-bold mb-2 mt-4'>6. Incorrect Address</p>
        <p>Please ensure your shipping address is accurate at checkout. Karuna is not responsible for lost or delayed shipments due to incorrect addresses.</p>
        <p className='mt-6'>If you have any questions or need assistance with shipping, please contact us at [your contact email].</p>
      </div>
      
      <QueryForm />
    </div>
  )
}

export default ShippingPolicy