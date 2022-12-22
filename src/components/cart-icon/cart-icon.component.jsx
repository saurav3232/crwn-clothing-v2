import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectIsCartOpen,selectCartCount } from '../../store/cart/cart.selecter';
import { useDispatch } from 'react-redux';
// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
// import { CartContext } from '../../contexts/cart.context';
const CartIcon=()=>{
    // const {isCartOpen,setIsCartOpen,cartCount}= useContext(CartContext);
    const cartCount = useSelector(selectCartCount);
    const dispatch=useDispatch();  
    const isCartOpen=useSelector(selectIsCartOpen);
    const toggleIsCartOpen=()=>dispatch(setIsCartOpen(!isCartOpen)); 
    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon;
