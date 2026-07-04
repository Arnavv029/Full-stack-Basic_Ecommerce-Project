import { createContext, useContext, useEffect, useState} from 'react'; 

const CardContext = createContext()

export const CartProvider = ({children}) => {

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [cartItems, setCartitems ] = useState([])
    const [total, setTotal] = useState(0)

    const fetchCard = async() => {
        try{ 
            const res = await fetch(`${BASEURL}/api/card/`)
            if(!res.ok){ 
                throw new Error("Failed To fetch api ")
            }

            const data = await res.json()
            setCartitems(data.items || [])
            setTotal(data.total || [])
        }
        catch(error){ 
            console.log("Error fetching card", error);
        }
    }

    useEffect(() => {
        fetchCard()
    } ,[])

    const Addtocard = async(product) => {

        try {
        await fetch(`${BASEURL}/api/card/add/`, { 
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({product_id:product.id}),
        }); fetchCard() }
        
        catch(error){
            console.log("Error fetching card", error);
        }
    }

    const Removeitems = async(id) => { 
        try{ 
            await fetch(`${BASEURL}/api/card/remove/`, {
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
            await fetch(`${BASEURL}/api/update/`, { 
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

    return <CardContext.Provider value={{cartItems, total, Addtocard, Removeitems, Updatequantity}}> 
            {children}
    </CardContext.Provider>

}

export const useCard = () => useContext(CardContext)