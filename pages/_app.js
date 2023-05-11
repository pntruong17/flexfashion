import Layout from "@/components/layout";
import { LikeContextProvider } from "@/context/like-context";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { CartContextProvider } from "@/context/cart-context";

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
