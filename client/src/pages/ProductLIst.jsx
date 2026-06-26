import React, { useState, useEffect } from 'react' 
import ProductCard from '../components/ProductCard' 

const ProductLIst = () => {

    const [products, setProducts] = useState([]) 
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null)
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    useEffect(() => {
        fetch(`${BASEURL}/api/products/`)
            .then((response) => { 
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setProducts(data)
                setLoading(false)
            })
            .catch((error) => { 
                setError(error.message)
                setLoading(false)
            })
    }, []) 

    if (loading) {
        return <div className='text-center mt-10'>Loading...</div>
    }

    if (error) {
        return <div className='text-center mt-10 text-red-500'>Error: {error}</div>
    }

    return ( 
        <div className='min-h-screen bg-gray-100 '>  
            <h1 className='text-3xl font-bold text-center py-6 bg-white shadow-md'>Product List</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
                {products.length > 0 ? (products.map( (product) => ( <ProductCard key={product.id} product={product} /> )))  : <div>Product is not Listed </div> }
            </div>
        </div>
    )
}

export default ProductLIst