import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_Fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("")
  const navigate = useNavigate();

  const addToCart = async(product_id, quantity) => {
    if(!token) {
      toast.error("please log in to add items to the cart");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/cart/add",
      { userId: token, itemId: product_id, quantity },  // Pass userId
      { headers: { token } }
      );

      if(response.data.success) {
        setCartItems(response.data.cart);
        toast.success("Product added to the cart")
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      totalCount += cartItems[itemId]; // Directly add quantity
    }

    return totalCount;
  }

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.discounted_price * cartItems[itemId]; 
      }
    }

    return totalAmount;
  }

  const getProductsData = async() => {
    try {
      
      const response = await axios.get(backendUrl + '/api/product/list')
      console.log(response.data);

      if(response.data.success) {
        setProducts(response.data.products)
      } else {
        console.log("cannot fetch products"); 
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const getUserCart = async(token) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get',
        { userId: token },
        {headers: {token}}
      )
      if(response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) { 
      console.log(error);
    }
  };

  const updateQuantity = async(itemId, quantity) => {
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { userId: token, itemId, quantity },
          { headers: { token } }
        );
  
        if (response.data.success) {
          setCartItems(response.data.cartData); // Update state after successful update
        } else {
          toast.error("Failed to update cart");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error updating cart");
      }
    }
  }

  useEffect(() => {
    getProductsData(); // Fetch products when the app starts
  }, []);

  useEffect(() => {
    if(!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  }, [])

  const value = {
    products, currency,
    search, setSearch,
    cartItems, addToCart, setCartItems, updateQuantity,
    getCartCount, getCartAmount,
    navigate,
    backendUrl,
    token, setToken,
    delivery_Fee
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider