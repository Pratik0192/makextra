
import React from 'react'
import QueryForm from '../components/QueryForm'

const ReturnPolicy = () => {
  return (
    <div className='mx-8 md:mx-16 lg:mx-32 xl:mx-96 mt-5 md:mt-5'>
      <h2 className='text-[#103948] text-2xl lg:text-5xl mb-8'>Return, Refund, and Exchange Policy</h2>
      <div className="text-gray-500">
        <p className='font-bold mb-2'>Return, Refund, and Exchange Policy</p>
        <p>We want you to be completely satisfied with your purchase at Karuna. If you’re not, please review our policy below for returns, refunds, and exchanges.</p>
        <p className='font-bold mb-2 mt-4'>1. Eligibility for Returns</p>
        <p>Items may be returned within [30 days] of delivery, provided they are unworn, unwashed, and in their original condition with all tags attached. Items marked as "final sale" are not eligible for return or exchange.</p>
        <p className='font-bold mb-2 mt-4'>2. Return Process</p>
        <p>To initiate a return, please contact our customer support team at [your contact email] with your order number and reason for return. Once approved, we’ll provide you with return instructions. Customers are responsible for return shipping costs unless the item received was incorrect or defective.</p>
        <p className='font-bold mb-2 mt-4'>3. Refund Policy</p>
        <p >Once we receive your returned item, please allow [5-7 business days] for processing. Approved refunds will be issued to your original payment method. Please note that any original shipping charges are non-refundable.</p>
        <p className='font-bold mb-2 mt-4'>4. Exchanges</p>
        <p>If you wish to exchange an item for a different size or color, please contact us within [30 days] of receiving your order. Exchanges are subject to product availability, and additional shipping fees may apply.</p>
        <p className='font-bold mb-2 mt-4'>5. Damaged or Defective Items</p>
        <p>If you receive a damaged or defective item, please contact us immediately with photos of the product. We will gladly replace or refund the item.</p>
        <p className='font-bold mb-2 mt-4'>6. Non-Returnable Items</p>
        <p>Certain items, such as undergarments, swimwear, and personalized products, are not eligible for return, refund, or exchange for hygiene and customization reasons.</p>
        <p>If you have questions regarding our Return, Refund, and Exchange Policy, feel free to reach out to us at [your contact email].</p>
      </div>
      
      <QueryForm />
    </div>
  )
}

export default ReturnPolicy