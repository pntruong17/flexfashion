import { CartProvider } from "react-use-cart";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { LikeContextProvider } from "@/context/like-context";
import Layout from "@/components/layout";

function App({ Component, pageProps }) {
  return (
    <LikeContextProvider>
      <CartProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </LikeContextProvider>
  );
}

export default App;
