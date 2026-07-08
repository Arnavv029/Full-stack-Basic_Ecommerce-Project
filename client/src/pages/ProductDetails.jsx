import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCard } from '../context/CardContext'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { getAccessToken } from '../utils/auth'

const ProductDetails = () => {
    const { id } = useParams()
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { Addtocard } = useCard()

    const navigate = useNavigate();

    const handleAddtoCard = () => {
        if (!getAccessToken()) {
            navigate("/login");
            return;
        }

        Addtocard(product);
    };

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed TO Fetch Data")
                }
                return response.json()
            })

            .then((data) => {
                setProduct(data)
                setLoading(false)
            })

            .catch((e) => {
                setError(e.message)
                setLoading(false)
            })

    }, [BASEURL, id])

    if (loading) {
        return <div className='text-center mt-10'>Loading...</div>
    }

    if (error) {
        return <div className='text-center mt-10 text-red-500'>Error: {error}</div>
    }

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center py-10'>
            <div className='bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full'>
                <div className='flex flex-col md:flex-row gap-8'>
                    <img src={`${product.image}`} alt="" className='w-full md:w-1/2 h-auto object-cover rounded-lg' />
                    <div className='flex-1'>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>{product.name}</h1>
                        <p className='text-gray-600 mb-4'>{product.decription}</p>
                        <p className='text-2xl font-semibold text-green-600 mb-6'>{product.price}</p>
                        <button onClick={handleAddtoCard} className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>
                            Add To Card
                        </button>
                        <div className="mt-4">
                            <Link
                                to="/"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                ← Back To Home Page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails