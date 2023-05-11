import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { CartContextProvider } from "@/context/cart-context";
import { LikeContextProvider } from "@/context/like-context";
import Layout from "@/components/layout";

function App({ Component, pageProps }) {
  return (
    <LikeContextProvider>
      <CartContextProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </LikeContextProvider>
  );
}

export default App;
