import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOut.css";
const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87BBFD",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
  },
};

function CheckOutComponent({ userId, price, items }) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleCheckOut = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await fetch("https://elibrary-livid.vercel.app/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: id,
            price: price,
            items: items,
            userId: userId,
          }),
        });

        setSuccess(true);
      } catch (err) {
        console.log("error", err);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="paymentFormContainer">
      {!success ? (
        <form onSubmit={handleCheckOut} className="paymentForm">
          <fieldset className="FormGroup">
            <div className="formRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="payBtn">Pay</button>
        </form>
      ) : (
        <div className="orderProcessedContainer">
          <h2>
            You just bought a sweet package, Thank you for choosing our products{" "}
          </h2>
        </div>
      )}
    </div>
  );
}

export default CheckOutComponent;
