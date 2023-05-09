import * as React from "react";
import { useRouter } from "next/router";
import { getAllProducts } from "@/utils/callback";

function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [order, setOrder] = React.useState(null);

  React.useEffect(() => {
    const fetchOrder = async () => {
      const { order } = await getOrderBySessionId({ id: router.query.id });

      setLoading(false);
      setOrder(order);
    };

    if (router.query.id) fetchOrder();
  }, [router.query.id]);

  if (loading) return "loading";

  return order ? <pre>{JSON.stringify(order, null, 2)}</pre> : "none";
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const prod = await fetch("https://fakestoreapi.com/products?limit=6");
  const allProducts = await getAllProducts();
  const categories = await res.json();
  const products = await prod.json();
  const pageProps = {
    categories: categories,
    products: products,
    allproducts: allProducts,
  };
  return { props: { ...pageProps } };
}
export default SuccessPage;
