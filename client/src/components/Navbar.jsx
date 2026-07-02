import React from 'react'
import { useCard } from '../context/CardContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const {cartItems} = useCard()

    const cartCount = cartItems.reduce((total, item) => total + item.quantity , 0)

  return (

    <nav className='bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50'>
        <Link to='/' className='text-2xl font-bold text-gray-800'> 
            Mohti Mart 
        </Link>

        <Link to='/card' className='relative text-gray-600 font-medium'> 
            card
            {cartCount  > 0 && ( 
                <span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2'>
                    {cartCount}
                </span>
            )}
        </Link>
    </nav>
  )
}

export default Navbar