import { createContext, useContext, useEffect, useState} from 'react'; 
import { authFetch, getAccessToken } from '../utils/auth'; 


const CardContext = createContext()

export const CartProvider = ({children}) => {

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [cartItems, setCartitems ] = useState([])
    const [total, setTotal] = useState(0)

    const fetchCard = async() => {
        if (!getAccessToken()) {
            setCartitems([])
            setTotal(0)
            return
        }

        try{ 
            const res = await authFetch(`${BASEURL}/api/card/`)
            if(!res.ok){ 
                throw new Error("Failed To fetch api ")
            }

            const data = await res.json()
            setCartitems(data.items || [])
            setTotal(data.total || 0)
        }
        catch(error){ 
            console.log("Error fetching card", error);
        }
    }

    useEffect(() => {
        fetchCard()

        const handleAuthChange = () => fetchCard()
        window.addEventListener('auth-changed', handleAuthChange)

        return () => window.removeEventListener('auth-changed', handleAuthChange)
    } ,[])

    const Addtocard = async(productOrId) => {
        const productId = typeof productOrId === 'object' ? productOrId?.id : productOrId

        if (!productId) {
            console.error('Product id is missing')
            return
        }

        try {
            await authFetch(`${BASEURL}/api/card/add/`, { 
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({product_id: productId}),
            })
            fetchCard()
        }
        
        catch(error){
            console.log("Error fetching card", error);
        }
    }

    const Removeitems = async(id) => { 
        try{ 
            await authFetch(`${BASEURL}/api/card/remove/`, {
                method:"POST",
                headers:{ 
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({item_id:id})
            }); fetchCard()
        }
        catch(error){ 
            console.log("Error fetching card", error);
        }
    }

    const Updatequantity = async(id, quantity) => { 

        if (quantity < 1){ 
            Removeitems(id)
        }

        try{ 
            await authFetch(`${BASEURL}/api/update/`, { 
                method:"POST",
                headers:{ 
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({item_id:id, quantity:quantity})
            }); fetchCard()
        }
        catch(error){ 
            console.log("Error fetching card", error);
        }
    }

    const ClearCard = () => {
        setCartitems([])
        setTotal(0)
    }

    return <CardContext.Provider value={{cartItems, total, Addtocard, Removeitems, Updatequantity, ClearCard}}> 
            {children}
    </CardContext.Provider>

}

export const useCard = () => useContext(CardContext)