import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import AuthContext from "../../AuthContext/AuthContext";
import { useContext } from "react";
import "./items.css";

function ItemsComponent() {
  const [items, setItems] = useState();
  const { category } = useParams();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        `https://elibrary-livid.vercel.app/get-products/${category}`
      );

      const data = await response.json();
      setItems(data);
    };
    getItems();
  }, [category]);
  return (
    <div className="itemsContainer">
      {!user ? (
        <h1
          style={{
            color: "red",
            textAlign: "center",
            padding: "1.8rem 0",
            marginBottom: "5rem",
          }}
        >
          What are you waiting for ?, <Link to="/login">Login</Link> now and start buying the best
          products for you or your children's education!
        </h1>
      ) : null}
      {items && items.map((item) => <ItemCard item={item} key={item._id} />)}
    </div>
  );
}

export default ItemsComponent;
