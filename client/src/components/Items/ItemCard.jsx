import { useContext, useEffect, useState } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import "./items.css";
function ItemCard({ item }) {
  const { user, dispatch } = useContext(AuthContext);
  const [isAdded, setIsAdded] = useState(user?.cartItems?.includes(item?._id));

  const handleCart = async (e, itemId) => {
    if (e.target.textContent === "ADD TO CART") {
      await fetch(`https://elibrary-livid.vercel.app/add-item-to-cart/${itemId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });
      dispatch({ type: "ADD_ITEM_TO_CART", payload: itemId });
    } else {
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
    }
    setIsAdded(!isAdded);
  };

  useEffect(() => {
    setIsAdded(user?.cartItems?.includes(item?._id));
  }, [item?._id, user, user?.cartItems]);

  return (
    <div className="item">
      <div className="itemInfos">
        <img src={item.image} alt="item"></img>
        <div className="itemNamePrice">
          <h1 className="itemName">{item.name}</h1>
          <span className="itemPrice">{item.price}$</span>
        </div>
      </div>
      {user ? (
        <button
          type="button"
          className="itemBtn"
          onClick={(e) => handleCart(e, item._id)}
        >
          {isAdded ? "REMOVE FROM CART" : "ADD TO CART"}
        </button>
      ) : null}
    </div>
  );
}

export default ItemCard;
