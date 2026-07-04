import React from 'react'
import { useCard } from '../context/CardContext'

const Cardpage = () => {

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const {cartItems, total, Removeitems, Updatequantity} = useCard() 
    // const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (

    <div className='pt-20 min-h-screen bg-gray-100 p-8'> 
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Your Cart</h1>
        {cartItems.length === 0 ? (
            <p className='text-gray-600'>Your cart is empty.</p>
        ) : (
            <div className='max-w-4xl mx-auto'>
                {cartItems.map((item) => (
                    <div key={item.id} className='flex items-center justify-between mb-4'>
                        <div>
                            <h2 className='text-lg font-semibold'>{item.product_name}</h2>
                            <p className='text-gray-600'>Price: ${item.product_price}</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            {item.product_image && (
                                <img src={`${BASEURL}${item.product_image}`} alt={item.product_name} className='w-16 h-16 object-cover rounded-lg' />
                            )}
                        </div>
                        <div className='flex items-center gap-3'>
                            <button onClick={() => Updatequantity(item.id, item.quantity - 1)} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition'>
                                -
                            </button>
                            <span className='text-lg font-bold text-gray-800'>{item.quantity}</span>
                            <button onClick={() => Updatequantity(item.id, item.quantity + 1)} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition'>
                                +
                            </button>
                            <button onClick={() => Removeitems(item.id)} className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <div className='border-t border-gray-300 pt-4 mt-4'>
                    <p className='text-xl font-bold text-gray-800'>Total: ${total.toFixed(2)}</p>
                </div>
            </div>
        )}
    </div>

  )
}

export default Cardpage