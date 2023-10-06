import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./utils/config/firebase-config";
import { collection, getDocs } from "@firebase/firestore/lite";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Catalog from "./components/reports/Catalog";
import logo from "./img/logo-white.png";

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

  const getName = (name) => {
    const date = new Date();
    return `#${Math.floor(date.getTime() / 1000)}-${name}-MAYOKA-${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    }-${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}`;
  };

  return (
    <div className="container mx-auto max-sm:px-0 max-lg:px-[5%] max-xl:px-[10%] max-2xl:px-[20%] px-[15%]">
      <div className="bg-black h-screen flex flex-col justify-between">
        <div className="flex justify-center items-center">
          <img className="w-[250px]" src={logo} alt="logo" />
        </div>
        <div className="mb-[5rem] flex flex-col gap-2 items-center">
          <PDFDownloadLink
            className="font-sofiaSans rounded-sm text-lg text-center bg-[#0097B2] border-white border-2 text-white py-2 w-[66%]"
            document={<Catalog products={products} />}
            fileName={`${getName("CATALOGO")}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Cargando..." : "Descargar Catálogo"
            }
          </PDFDownloadLink>
          <PDFDownloadLink
            className="font-sofiaSans rounded-sm text-lg text-center bg-white border-[#0097B2] border-2 text-[#0097B2] py-2 w-[66%]"
            document={<Catalog products={products} />}
            fileName={`${getName("REPORTE")}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Cargando..." : "Descargar Reporte"
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}

export default App;
