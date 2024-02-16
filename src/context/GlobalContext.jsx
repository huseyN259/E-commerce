import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookieContext } from "./CookieContext";
const Context = createContext();
export default Context;

export const GlobalContext = ({ children }) => {
    const { cookies } = useCookieContext();
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState("All")
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem("currency") || "$";
    });
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();
    const [isContextMount, setIsContextMount] = useState(false)
    const totalQuantity = orders.reduce((total, order) => total + order.quantity, 0);






    
    async function getProducts() 
    {

        try {
            const response = await fetch("http://localhost:5000/api/products");
            if (response.ok)
             {
                const data = await response.json()
                setProducts(data.product)
            }
            else
             {
                console.log(response.status)
                console.log(response.json())
            }
        } catch (error) {console.log(error)
        }
    }
    async function getCategories() {
        try {
            const response = await fetch("http://localhost:5000/api/products");
            if (response.ok) 
            {
                const data = await response.json()
                const { product } = data;

                const cat = Array.from(new Set(product.map(p => p.category)));

                setCategories(["All", ...cat])
            }
            else
             {
                console.log(response.status)
                console.log(response.json())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getProductById = async (id) => 
    {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);

            if (response.ok) 
            {

                const data = await response.json();
                const { product } = data;
                return product;
            }
            else {
                console.log(response.status)
                console.log(response.json())
            }
        } catch (error) {console.log(error) }
    }
    async function filterProducts(category) {
        if (category === "All") setFilteredProducts([...products])
        else 
    {
            var filtered = products.filter((p) => p.category === category);
            console.log([...filtered])
            
            
            setFilteredProducts(filtered);
        }
    }

    function addProductToOrder(p) 
    {
        const productExists = orders.find(product => product.id === p.id);

        if (!productExists) {
            const productWithQuantity = { ...p, quantity: 1 };
            setOrders(prev => [...prev, productWithQuantity]);

        } else 
        {
            if (!((productExists.quantity + 1) <= productExists.inventory))
        
            return
            setOrders(prev =>
                prev.map(product =>
               
                    product.id === p.id 
                     ? { ...product, quantity: product.quantity + 1 } 
                     : product
                )
            );
        }
    }

    async function getOrders()
    {
        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                headers:
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${cookies.accessToken}`
                }
            })
            if (response.ok) 
            {
                const data = await response.json();
                setOrders(data.orderItems);
            }
        } catch (error) { console.log(error); }
    }

    async function sendOrders() {
        try
         {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "PUT",
                body: JSON.stringify({ orderItems: orders }),
                headers:
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${cookies.accessToken}`
                }
            })
            if (!response.ok) {
                console.log(response.status)
                console.log(response.json())
            }
        } catch (error) {console.log(error)}
    }

    const isTokenExpired = (token) => 
    {
        if (!token) { return true; }
    
        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        const expirationTime = payload.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        return expirationTime < currentTime;
    };

    useEffect(() => { localStorage.setItem("currency", currency); }, [currency]);
    useEffect(() => { getOrders()}, [])
    useEffect(() => 
    {
        if (isContextMount){ sendOrders(); }
        else {setIsContextMount(true);}
    }, [orders])

    const contextData = {
        getCategories: getCategories,
        categories: categories,
        navigate: navigate,
        currentCategory: currentCategory,
        setCurrentCategory: setCurrentCategory,
        filterProducts: filterProducts,
        filteredProducts: filteredProducts,
        products: products,
        getProducts: getProducts,
        orders: orders,
        setOrders: setOrders,
        getOrders: getOrders,
        isTokenExpired: isTokenExpired,
        addProductToOrder: addProductToOrder,
        currency: currency,
        setCurrency: setCurrency,
        totalQuantity: totalQuantity,
        getProductById: getProductById
    }

    return (<Context.Provider value={contextData}>{children}</Context.Provider>)
}