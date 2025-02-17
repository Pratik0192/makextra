import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion";
import CustomToast from "../components/CustomToast";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = 'Rs.';
  const delivery_Fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("")
  const [toastData, setToastData] = useState(null);

  const navigate = useNavigate();

  const addToCart = async(product_id, quantity) => {
    if(!token) {
      setToastData({ message: "Please Log in to add items", type: "error" });
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

        const product = products.find((p) => p._id === product_id);
        if(product) {
          setToastData({ name: product.name, image: product.images[0] })
        }

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

  const calculateTaxPercentage = (cartTotal) => {
    const taxRate = 15.26 / 100;
    return cartTotal * taxRate;
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

  useEffect(() => {
    if(token) {
      getUserCart(token);
    }
  }, [cartItems])

  

  const value = {
    products, currency,
    search, setSearch,
    showSearch, setShowSearch,
    cartItems, addToCart, setCartItems, updateQuantity,
    getCartCount, getCartAmount,
    navigate,
    backendUrl,
    token, setToken,
    delivery_Fee,
    calculateTaxPercentage
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}

      <AnimatePresence>
        {toastData && (
          <CustomToast product={toastData} onClose={() => setToastData(null)} />
        )}
      </AnimatePresence>

    </ShopContext.Provider>
  )
}

export default ShopContextProvider