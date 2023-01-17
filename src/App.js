import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products?limit=1000`);
      const response = await res.json();
      if (response.products) {
        setProducts(response.products);
      }
    };
    fetchProducts();
  }, []);

  const nextPage = () => {
    setPages((prevState) => prevState + 1);
  };

  const PrevPage = () => {
    setPages((prevState) => prevState - 1);
  };

  const numClick = (index) => {
    if (pages !== index + 1) {
      setPages(index + 1);
    }
  };

  return (
    <div className="App">
      <h2>Products Pagination</h2>
      <h3> This is Page {pages} </h3>
      <div className="main-div">
        {products.slice(pages * 10 - 10, pages * 10).map((items, index) => (
          <div className="product-card" key={index}>
            <span>Product No- {items.id} </span>
            <div className="product-image">
              <img
                src={items.thumbnail}
                alt={items.title}
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

      <div className="pagination">
        {pages > 1 && (
          <span className="prevBtn" onClick={PrevPage}>
            Previous
          </span>
        )}
        <span>
          {[...Array(products.length / 10)].map((items, i) => (
            <span
              className={pages === i + 1 ? `numbers-black` : `numbers-white`}
              key={i + 1}
              onClick={() => numClick(i)}
            >
              {i + 1}
            </span>
          ))}
        </span>
        {pages < products.length / 10 && (
          <span className="nextBtn" onClick={nextPage}>
            Next
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
