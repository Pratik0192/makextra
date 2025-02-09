import React from 'react'
import QueryForm from './QueryForm'

const PrivacyPolicy = () => {
  return (
    <div className='mx-8 md:mx-16 lg:mx-32 xl:mx-96 mt-5 md:mt-5'>
      <h2 className='text-[#103948] text-2xl lg:text-5xl mb-8'>Privacy Policy</h2>
      <div className="text-gray-500">
        <p className='font-bold mb-2'>Privacy Policy</p>
        <p>At Makextra, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share information when you use our website.</p>
        <p className='font-bold mb-2 mt-4'>1. Information Collection</p>
        <p>We may collect personal information such as your name, email address, phone number, and shipping address when you create an account, place an order, or subscribe to our newsletter.</p>
        <p className='font-bold mb-2 mt-4'>2. Use of Information</p>
        <p>The information we collect is used to process your orders, improve your shopping experience, and communicate with you regarding our products, services, and promotions.</p>
        <p className='font-bold mb-2 mt-4'>3. Cookies and Tracking</p>
        <p >Our website uses cookies and similar tracking technologies to personalize your experience and analyze site traffic. You can adjust your browser settings to manage cookies, but doing so may affect your use of certain site features.</p>
        <p className='font-bold mb-2 mt-4'>4. Information Sharing</p>
        <p>We do not sell or rent your personal information to third parties. However, we may share information with trusted service providers who assist us in operating our website, processing payments, or fulfilling orders, subject to confidentiality agreements.</p>
        <p className='font-bold mb-2 mt-4'>5. Data Security</p>
        <p>We implement reasonable security measures to protect your information from unauthorized access. However, no method of data transmission is entirely secure, so we cannot guarantee absolute security.</p>
        <p className='font-bold mb-2 mt-4'>6. Your Rights</p>
        <p>You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.</p>
        <p className='font-bold mb-2 mt-4'>7. Changes to This Policy</p>
        <p>Makextra reserves the right to update this Privacy Policy at any time. Any changes will be posted here, and your continued use of our site constitutes acceptance of the updated terms.</p>
        <p className='mt-6'>For questions regarding our Privacy Policy, please reach out to us at [your contact email].</p>
      </div>
      
      <QueryForm />
    </div>
  )
}

export default PrivacyPolicy