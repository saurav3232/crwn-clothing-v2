import { createContext, useState,useEffect } from "react";
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    deleteItemFromCart: () => { },
    clearItemFromCart: ()=>{},
    cartCount:0,
    cartTotal:0
});
const addCartItem = (cartItems, productToAdd) => {
    //find if the cartItems already conatins the product
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    // if found increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    // return array with modified cartItems/new cart Item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const deleteCartItem = (cartItems, productToDelete) => {
    // const del_idx = cartItems.findIndex((item) => item.id === productToDelete.id);
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToDelete.id
    );
    // console.log(existingCartItem.quantity);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== productToDelete.id);
    } else {
        return cartItems.map((cartItem) =>
            cartItem.id === productToDelete.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
};
const clearCartItem=(cartItems,productToRemove)=>
{
    return cartItems.filter((item) => item.id !== productToRemove.id);
}
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount,setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal,setCartTotal] = useState(0);
    useEffect(()=>{
        const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0 )
        setCartCount(newCartCount);
    },[cartItems])
    useEffect(()=>{
        const newCartTotal=cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0 )
        setCartTotal(newCartTotal);
    },[cartItems])
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete));
    };
    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove));
    };
    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        deleteItemFromCart,
        cartCount,
        clearItemFromCart,
        cartTotal
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
