import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutComponent from "./CheckOut/CheckOutComponent";
import { useLocation } from "react-router-dom";
const PUBLIC_KEY =
  "pk_test_51NpI5gKmLdfMKBYI4oH8KHmqLtnlaVYKsi2CllL2q4yUcl9SuWBcP99NMX3YZ0aQZnZKbTSAF0Y8TjO3t5C4BQby00fe8iGdwr";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function Stripe() {
  const location = useLocation();
  const { items, price, userId } = location.state;

  return (
    <Elements stripe={stripeTestPromise}>
      <CheckOutComponent items={items} price={price} userId={userId} />
    </Elements>
  );
}
