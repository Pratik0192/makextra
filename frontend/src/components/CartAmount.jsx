import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartAmount = () => {

  const { currency, getCartAmount, delivery_Fee } = useContext(ShopContext)
  const cartTotal = getCartAmount();
  const finalAmount = cartTotal + delivery_Fee

  return (
    <div className="w-full bg-white border-2 border-gray-200 rounded-md p-6">
      <Title text='Cart Total' />
      <div className="flex flex-col gap-3 mt-4 text-sm">
        <div className="flex justify-between">
          <p className='text-gray-600'>SubTotal</p>
          <p className='font-medium'>{currency} {cartTotal}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Delivery Fee</p>
          <p className="font-medium">
            {currency} {delivery_Fee}
          </p>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="flex justify-between text-lg font-medium">
        <b>Total</b>
        <b>{currency} {finalAmount}</b>
      </div>
    </div>
  )
}

export default CartAmount