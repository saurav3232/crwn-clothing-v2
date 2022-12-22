import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selecter";
import { useNavigate } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import { selectIsCartOpen } from '../../store/cart/cart.selecter';
import { setIsCartOpen } from "../../store/cart/cart.action";
import { useDispatch } from "react-redux";
const CartDropdown = () => {
  // const { cartItems, setIsCartOpen } = useContext(CartContext);
  const dispatch=useDispatch();
  const isCartOpen=useSelector(selectIsCartOpen);
  const cartItems=useSelector(selectCartItems);
  const navigate = useNavigate();
  const goToCheckouthandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container" onMouseLeave={()=>dispatch(setIsCartOpen(!isCartOpen))}>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckouthandler}>Go to CheckOut</Button>
    </div>
  );
};
export default CartDropdown;
