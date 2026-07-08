import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCard } from '../context/CardContext'
import { authFetch } from '../utils/auth'

const CheckoutPage = () => {

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const navigate = useNavigate()
    const { ClearCard } = useCard()
    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "cod",
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)
        try {
            const res = await authFetch(`${BASEURL}/api/order/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            console.log("Status:", res.status);
            const data = await res.json()
            console.log(data);
            if (res.ok) {
                setMessage("Order placed successfully!")
                // fetch(`${BASEURL}/api/card/`)
                ClearCard()
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }

            else {
                console.log(data);
                setMessage(data.error || data.message || "Failed to place order.");
            }
        }
        catch (error) {
            setMessage("An error occurred. Please try again.")
        }
    }
    return (
        <div className='min-h-screen p-6 bg-gray-100 flex justify-center items-center'>
            <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
                <h1 className='text-3xl font-bold text-center mb-6'>Checkout</h1>

                <form onSubmit={handleSubmit} className='space-y-4'>

                    <input name="name" type="text" placeholder='Full Name' value={form.name} onChange={handleChange} required
                        className="w-full border rounded-lg p-2" />

                    <textarea name="address" placeholder='Full Adress' value={form.address} onChange={handleChange} required
                        className="w-full border rounded-lg p-2" />

                    <input name="phone" type="tel" placeholder='Phone no' value={form.phone} onChange={handleChange} required
                        className="w-full border rounded-lg p-2" />

                    <select name="payment_method" value={form.payment_method} onChange={handleChange} required
                        className="w-full border rounded-lg p-2">
                        <option value="cod">Cash on Delivery</option>
                        <option value="card">Card Payment</option>
                    </select>

                    <button type='submit' disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        {loading ? "Processing..." : "Place Order"}
                    </button>

                    {message && (<p className='text-center text-green-700 font-semibold mt-4'>{message}</p>)}

                </form>

            </div>
        </div>
    )
}

export default CheckoutPage