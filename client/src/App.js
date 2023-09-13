import Home from "./routes/home/Home";
import Header from "./routes/header/Header";
import ItemsComponent from "./components/Items/ItemsComponent";
import ShoppingCart from "./routes/shoppingCart/ShoppingCart";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Stripe from "./components/Stripe";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:category" element={<ItemsComponent />} />
          <Route path="/shopping_cart" element={<ShoppingCart />} />
          <Route path="/checkOut" element={<Stripe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
