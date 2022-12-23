import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selecter";
import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount=useSelector(selectCartTotal);
  const currentUser=useSelector(selectCurrentUser);
  const [isProcessingPayment,setIsProcessingPayment]=useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!stripe || !elements) return;

    if (elements == null) {
      return;
    }
    setIsProcessingPayment(true);
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });
    const response=await fetch('/.netlify/functions/create-payment-intent',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({amount:amount *100})
    }).then(res=>res.json())
    // console.log(response);
    const {paymentIntent:{client_secret}}=response;
    // console.log(client_secret); 
    const paymentResult=await stripe.confirmCardPayment(client_secret,{
        payment_method:{
            card:elements.getElement(CardElement),
            billing_details:{
                name:currentUser?currentUser.displayName:'Guest'
            }
        }
    })
    // console.log(paymentResult);
    setIsProcessingPayment(false);
    if(paymentResult.error)
    {
        alert(paymentResult.error);
    }
    else{
        if(paymentResult.paymentIntent.status==='succeeded')
        {
            alert('Payment Successfull');
        }
    }


};
  return (
    
      <PaymentFormContainer>
        <FormContainer onSubmit={handleSubmit}>
          <h2>Credit Card Payment:</h2>
          <CardElement />
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            type="submit"
            isLoading={isProcessingPayment}
          >
            Pay
          </Button>
        </FormContainer>
      </PaymentFormContainer>
  );
};
export default PaymentForm;
