import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./utils/config/firebase-config";
import { collection, getDocs } from "@firebase/firestore/lite";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Catalog from "./components/reports/Catalog";

function App() {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <PDFDownloadLink document={<Catalog products={products} />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
    </div>
  );
}

export default App;
