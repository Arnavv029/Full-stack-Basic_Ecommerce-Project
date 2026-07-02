import { createContext, useContext, useState} from 'react'; 

const CardContext = createContext()

export const CartProvider = ({children}) => {

    const [cartItems, setCartitems ] = useState([])

    const Addtocard = (product) => {
        const exiting = cartItems.find((item) => item.id == product.id)

        if(exiting){ 
            setCartitems( cartItems.map((item) => 
                item.id === product.id ? {...item, quantity: item.quantity + 1 } : item
            ))
        }
        else{ 
            setCartitems([...cartItems, {...product, quantity:1}])
        }
    }

    const Removeitems = (id) => { 
        setCartitems( cartItems.filter((item) => item.id != id) )
    }

    const Updatequantity = (id, quantity) => { 
        setCartitems(cartItems.map((item) => (item.id === id) ? {...item, quantity} : item  ))
    }

    return <CardContext.Provider value={{cartItems, Addtocard, Removeitems, Updatequantity}}> 
            {children}
    </CardContext.Provider>

}

export const useCard = () => useContext(CardContext)