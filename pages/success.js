import * as React from "react";
import { useRouter } from "next/router";
import { getAllProducts, getCategories } from "@/utils/callback";

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
  const categories = await getCategories();
  const allproducts = await getAllProducts();
  const pageProps = {
    categories: categories,
    products: allproducts,
    allproducts: allproducts,
  };
  return { props: { ...pageProps } };
}
export default SuccessPage;
