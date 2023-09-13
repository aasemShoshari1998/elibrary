import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  const [categories, setCategories] = useState();
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("http://localhost:8000/get-categories");

      const data = await response.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <div className="categoriesContainer">
      {categories &&
        categories.map((category) => (
          <Link key={category._id} to={`/${category.name}`}>
            <div className="category">
              <h1 className="categoryTitle">{category.name}</h1>
              <img src={category.image} alt="category"></img>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Home;
