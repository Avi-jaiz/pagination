import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products?limit=1000`);
      const response = await res.json();

      setProducts(response.products);
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className="App">
      <h2>Products Pagination</h2>

      <div className="main-div">
        {products.map((items, index) => (
          <div className="product-card" key={index}>
            <div className="product-image">
              <img
                src={items.images[0]}
                alt={items.images[0]}
                className="prod-img"
              />
            </div>
            <div className="product-name">
              <h3 className="product-name">{items.title}</h3>
            </div>
            <div className="card-body">
              <div className="product-desc">
                <p> {items.description} </p>
              </div>
              <div className="product-details">
                <p>{items.price}</p>
                <p>{items.rating}</p>
                <p>{items.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
