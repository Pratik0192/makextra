import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
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
        backendUrl + '/api/user/cart/add',
        { product_id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
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
    for(const items in cartItems) {
      for(const item in cartItems[items]) {
        try {
          if(cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          
        }
      }
    }
    return totalCount;
  }

  const getCartAmount = () => {
    return products.reduce((total, product) => {
      if (cartItems[product._id]) {
        total += product.price * cartItems[product._id];
      }
      return total;
    }, 0);
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

  const getUserCart = async(authToken) => {
    try {
      const response = await axios.get(backendUrl + '/api/user/cart/get', {
        headers: { Authorization : `Bearer ${authToken || token}` },
      })

      if(response.data.success) {
        setCartItems(response.data.cart);
        console.log("fetched Cart data", response.data.cart);
      } else {
        console.log("error fetching cart:", response.data.message);
      }
    } catch (error) {
      console.error("error fetching the cart items", error)
    }
  };

  const removefromCart = async(product_id) => {
    if(!token) {
      toast.error("please log in to remove items from the cart");
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/user/cart/remove",
        {product_id},
        {headers: {Authorization: `Bearer ${token}`}}
      );
      if(response.data.success) {
        setCartItems((prevCart) => prevCart.filter((item) => item.product_id !== product_id));
        toast.success("Product removed from the cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
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
    cartItems, addToCart, setCartItems,
    getCartCount, getCartAmount, removefromCart,
    navigate,
    backendUrl,
    token, setToken
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider