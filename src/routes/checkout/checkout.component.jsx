import "./checkout.styles.scss";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selecter";
import { selectCartTotal } from "../../store/cart/cart.selecter";
// import PaymentForm from "../../components/payments-form/payment-form.component";
import PaymentForm from "../../components/payments-form/payment-form.component";
const CheckOut = () => {
    // const { cartItems,cartTotal } = useContext(CartContext);
    const cartItems=useSelector(selectCartItems);
    const cartTotal=useSelector(selectCartTotal); 
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => (
                    <CheckOutItem key={cartItem.id} cartItem={cartItem}/>
            ))}
            <span className="total">Total :  &#x20B9;{cartTotal}</span>
            <PaymentForm/>
        </div>
    );
};
export default CheckOut;
