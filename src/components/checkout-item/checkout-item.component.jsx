import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const CheckOutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const {clearItemFromCart, addItemToCart, deleteItemFromCart}=useContext(CartContext)
  const clearItemHandler=()=>{
    clearItemFromCart(cartItem);
  }
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={()=>{deleteItemFromCart(cartItem)}}>
            &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={()=>{addItemToCart(cartItem)}}>
            &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemHandler}>&#10005;</span>
    </div>
  );
};
export default CheckOutItem;
