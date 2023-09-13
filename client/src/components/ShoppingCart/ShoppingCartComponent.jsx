import { useState, useEffect, useContext } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./shoppingCart.css";
import { Link } from "react-router-dom";
function ShoppingCartComponent() {
  const [items, setItems] = useState();
  const { user, dispatch } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const arr = [];
    items?.forEach((item) => {
      const obj = {
        id: item._id,
        quantity: 1,
        price: Number(item.price),
        image: item.image,
        name: item.name,
      };
      arr.push(obj);
    });
    setOrders(arr);
  }, [items]);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        `https://elibrary-livid.vercel.app/get-cart-items/${user._id}`
      );
      const data = await response.json();
      setItems(data.reverse());
    };
    getItems();
  }, [user._id, update]);

  useEffect(() => {
    setTotal(
      orders?.reduce((accumulator, object) => {
        return accumulator + Number(object.price);
      }, 0)
    );
  }, [orders]);
  const handleCart = async (itemId) => {
    await fetch(`https://elibrary-livid.vercel.app/remove-item-from-cart/${itemId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });
    dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: itemId });
    setUpdate(!update);
  };
  const handleIncrease = (e, id, price) => {
    const idx = orders.findIndex((counter) => counter.id === id);
    const state = [...orders];
    orders[idx] = {
      quantity: state[idx].quantity++,
      price: (state[idx].price += Number(price)),
    };

    setOrders(state);
  };

  const handleDecrease = (e, id, price) => {
    const idx = orders.findIndex((counter) => counter.id === id);
    const state = [...orders];
    if (state[idx].quantity === 1) {
      return;
    }
    orders[idx] = {
      ...state[idx],
      quantity: state[idx].quantity--,
      price: (state[idx].price -= Number(price)),
    };
    setOrders(state);
  };

  // const handleOrder = async () => {
  //   try {
  //     const response = await fetch("https://elibrary-livid.vercel.app/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         price: total,
  //         items: items,
  //         userId: user._id,
  //       }),
  //     });
  //     const data = await response.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      {orders?.length !== 0 ? (
        <div className="shoppingCartContainer">
          {orders &&
            orders.map((item, i) => (
              <div key={item.id} className="shoppingCartItem">
                <div className="shoppingCartItemInfos">
                  <img src={item.image} alt="item"></img>
                  <span className="itemName">{item.name}</span>
                </div>
                <div className="quantityPriceContainer">
                  <div className="quantity">
                    <div className="quantityTitle">Quantity</div>
                    <div className="quantityControl">
                      <ArrowDownwardIcon
                        data="backward"
                        className="quantityArrows"
                        onClick={(e) =>
                          handleDecrease(e, item.id, items[i].price)
                        }
                        disabled
                      />
                      <span className="quantityNum">{orders[i]?.quantity}</span>
                      <ArrowUpwardIcon
                        data="forward"
                        className="quantityArrows"
                        onClick={(e) =>
                          handleIncrease(e, item.id, items[i].price)
                        }
                      />
                    </div>
                  </div>
                  <div className="priceContainer">
                    <span className="priceTitle">Price</span>
                    <p className="price">
                      {Math.round(item.price * 100) / 100} $
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="removeFromCartBtn"
                  onClick={() => handleCart(item.id)}
                >
                  Remove from cart
                </button>
              </div>
            ))}
          {items?.length > 1 ? (
            <div className="orderNow">
              <Link
                className="orderNowBtn"
                to="/checkOut"
                state={{
                  price: total,
                  items: items,
                  userId: user._id,
                }}
              >
                ORDER ALL
              </Link>
              <p className="totalPrice">
                Total Price: {Math.round(total * 100) / 100} $
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="emptyCartMessageContainer">
          <h1 className="emptyCartMessage">Your shopping cart is empty</h1>
        </div>
      )}
    </>
  );
}

export default ShoppingCartComponent;
