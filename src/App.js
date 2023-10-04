import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./utils/config/firebase-config";
import { collection, getDocs } from "@firebase/firestore/lite";

function App() {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-6 mb-12">Productos</h1>
      <ul className="text-center">
        {products.map((product, key) => (
          <li key={key}>
            Nombre: <span className="text-gray-500 font-semibold capitalize">{product.name}</span>, 
            Precio: <span className="text-green-500 font-semibold">{product.price}$</span>, 
            Cantidad en stock: <span className="text-red-500 font-semibold">{product.stock}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
