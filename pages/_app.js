import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import GlobalState from "@/context/GlobalStates";
import { useEffect, useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const refreshOrders = async () => {
    const response = await fetch("/api/orders/");
    const { orders, success } = await response.json();
    success && setOrders(orders);
  };

  const refreshProducts = async () => {
    const response = await fetch("/api/product/");
    const { products, success } = await response.json();
    success && setProducts(products);
  };

  useEffect(() => {
    refreshOrders();
    refreshProducts();
  }, []);

  return (
    <GlobalState.Provider
      value={{ orders, refreshOrders, products, refreshProducts }}
    >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GlobalState.Provider>
  );
}
