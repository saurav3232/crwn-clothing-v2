import "./cart-item.styles.scss";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selecter";
import { removeItemFromCart } from "../../store/cart/cart.action";
import { useSelector } from "react-redux";
import Button from "../button/button.component";
const CartItem = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  // const {deleteItemFromCart}=useContext(CartContext);
  const cartItems=useSelector(selectCartItems);
  const dispatch=useDispatch();
  const handleDelete=()=>{
    // deleteItemFromCart(cartItem);
    dispatch(removeItemFromCart(cartItems,cartItem))
  }
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} X ${price}
        </span>
        <Button type='button' buttonType='inverted' className="deleteItem" onClick={handleDelete}>Delete Item</Button>
      </div>
    </div>
  );
};
export default CartItem;
