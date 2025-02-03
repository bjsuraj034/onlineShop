import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title'

const Carttotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    // Get cart subtotal
    const subtotal = getCartAmount();

    // Ensure delivery fee is only added if cart is not empty
    const totalAmount = subtotal > 0 ? subtotal + delivery_fee : 0;

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'}/>
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{subtotal}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency}{subtotal > 0 ? delivery_fee : 0}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency}{totalAmount}.00</b>
                </div>
            </div>
        </div>
    )
}

export default Carttotal;
