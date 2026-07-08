import React, { useEffect, useState } from 'react'
import { useCard } from '../context/CardContext'
import { Link, useNavigate } from 'react-router-dom'
import { getAccessToken, clearToken } from '../utils/auth'


const Navbar = () => {

    const {cartItems} = useCard()

    const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken())

    const cartCount = cartItems.reduce((total, item) => total + item.quantity , 0)

    const navigate = useNavigate()

    useEffect(() => {
        const updateLoginState = () => setIsLoggedIn(!!getAccessToken())
        updateLoginState()

        window.addEventListener('auth-changed', updateLoginState)
        return () => window.removeEventListener('auth-changed', updateLoginState)
    }, [])

    const handleLogout = () => { 
        clearToken()
        navigate('/login');
    }

  return (

    <nav className='bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50'>
        <Link to='/' className='text-2xl font-bold text-gray-800'> 
            Mohti Mart 
        </Link>

        <div className='flex items-center gap-6'>
                {/* Login/SignUp or Logout */}
                {!isLoggedIn ? (
                    <>
                        <Link to='/login' className='text-gray-800 hover:text-gray-600 font-medium'>
                            Login
                        </Link>
                        <Link to='/signup' className='text-gray-800 hover:text-gray-600 font-medium'>
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className='text-gray-800 hover:text-gray-600 font-medium'>
                        Logout
                    </button>
                )}
            </div>

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