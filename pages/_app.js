import { CartProvider } from "react-use-cart";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { LikeContextProvider } from "@/context/like-context";
import { SettingsProvider } from "@/context/settings";
import Layout from "@/components/layout";

function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <LikeContextProvider>
        <CartProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </LikeContextProvider>
    </SettingsProvider>
  );
}

export default App;
