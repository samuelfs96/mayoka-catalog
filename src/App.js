import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./utils/config/firebase-config";
import { collection, getDocs } from "@firebase/firestore/lite";
import { usePDF } from "@react-pdf/renderer";
import Catalog from "./components/reports/Catalog";
import logo from "./img/logo-white.png";
//import Report from "./components/reports/Report";

const refresh = (after) =>
  setTimeout(() => {
    window.location.reload();
  }, after);

const getName = (name) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  return `#${Math.floor(date.getTime() / 1000)}-${name}-MAYOKA-${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }-${month < 10 ? "0" + month : month}`;
};

function App() {
  const productsCollectionRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  const [instance, updateInstance] = usePDF({
    document: <Catalog products={products} />,
  });

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateInstance(<Catalog products={products} />)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  return (
    <div className="container mx-auto max-sm:px-0 max-lg:px-[5%] max-xl:px-[10%] max-2xl:px-[20%] px-[15%]">
      <div className="bg-black h-screen flex flex-col justify-between">
        <div className="flex justify-center items-center">
          <img className="w-[250px]" src={logo} alt="logo" />
        </div>
        <div className="mb-[5rem] flex flex-col gap-2 items-center">
          {instance.loading ?
          <div className="opacity-75 font-sofiaSans text-xl text-center bg-[#0097B2] text-white py-4 w-[66%]">
            Cargando data...
          </div>
          :
          <a
            className="font-sofiaSans text-xl text-center bg-[#0097B2] text-white py-4 w-[66%]"
            onClick={() => refresh(1000)}
            href={instance.url}
            download={`${getName("CATALOGO")}.pdf`}
          >
            Descargar Catálogo
          </a>
          }
          
          {/* <PDFDownloadLink
            onClick={() => refresh(1000)}
            className="font-sofiaSans rounded-sm text-lg text-center bg-white border-[#0097B2] border-2 text-[#0097B2] py-2 w-[66%]"
            document={<Report />}
            fileName={`${getName("REPORTE")}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Cargando..." : "Descargar Reporte"
            }
          </PDFDownloadLink> */}
        </div>
      </div>
    </div>
  );
}

export default App;
