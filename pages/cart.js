import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { getCategories, getAllProducts } from "@/utils/callback";
import Button from "@/components/ui/button";
import { ChevronDownSmallIcon, ChevronUpSmallIcon } from "@/components/icons";
import SEO from "@/components/seo";
import useSubmissionState from "hooks/use-form-submission";
import { useCartContext } from "@/context/cart-context";
import axios from "axios";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const activeCurrency = "USD";
function Cart() {
  const {
    items,
    totalItems,
    totalCost,
    deliveryCost,
    isEmpty,
    addItem,
    removeItem,
    clearItem,
  } = useCartContext();
  const router = useRouter();
  const {
    setSubmissionError,
    setSubmissionLoading,
    submissionError,
    submissionLoading,
    submissionState,
  } = useSubmissionState();

  const decrementItemQuantity = (item) => {
    removeItem(item.productId);
  };

  const incrementItemQuantity = (item) => {
    const newItem = { ...item, quantity: 1, totalCost: item.price };
    addItem(newItem);
  };

  const handleClick = async () => {
    try {
      setSubmissionLoading();

      const stripe = await stripePromise;

      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cancel_url: process.env.NEXT_PUBLIC_HOST,
          currency: "usd",
          items,
          success_url: process.env.NEXT_PUBLIC_HOST,
          email: "client@example.com",
        }),
      });

      if (!res.ok) {
        const error = new Error(
          "An error occurred while performing this request"
        );

        error.info = await res.json();
        error.status = res.status;

        throw error;
      }

      const { session } = await res.json();
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      setSubmissionSuccess();
    } catch (error) {
      setSubmissionError(error.message);
    }
  };

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <React.Fragment>
      <SEO title="Cart" />
      <h2 className="text-xl md:text-3xl font-Outfit font-semibold cursor-pointer mb-5">
        Cart:
      </h2>
      {items.map((item) => {
        return (
          <div className="flex items-center mb-4" key={item.productId}>
            <div className=" w-3/5 h-[160px] flex flex-grow items-center">
              <div className="h-full w-[140px] mr-4 bg-gray-50 p-1 overflow-hidden relative">
                <Image
                  fill
                  src={item.image}
                  width={item.image.width}
                  height={item.image.height}
                  alt="product in cart"
                />
              </div>
              <div className="h-full  flex flex-col justify-evenly">
                <Link
                  href={`/`}
                  className=" font-Baskerville text-xl sm:text-2xl lg:text-3xl"
                >
                  {item.name}
                </Link>
                <div className="sm:hidden text-left md:w-1/5">
                  <p className="text-lg sm:text-xl text-gray-800 font-Outfit font-black">
                    ${item.totalCost}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-gray-400 text-sm">${item.price} each</p>
                  )}
                </div>
                <button
                  className="text-gray-600 font-bold font-Outfit uppercase hover:text-black text-[10px] flex items-center justify-center focus:outline-none border border-gray-600 w-14 h-6"
                  onClick={() => clearItem(item.productId)}
                  disabled={submissionLoading}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center ml-auto">
              <button
                className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
                onClick={() => incrementItemQuantity(item)}
                disabled={submissionLoading}
              >
                <ChevronUpSmallIcon className="w-8 sm:w-12" />
              </button>
              <span className="font-Outfit mx-3 md:mx-6 p-1 text-xl sm:text-2xl font-semibold">
                {item.quantity}
              </span>
              <button
                className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
                onClick={() => decrementItemQuantity(item)}
                disabled={submissionLoading}
              >
                <ChevronDownSmallIcon className="w-8 sm:w-12" />
              </button>
            </div>
            <div className="hidden sm:block text-right md:w-1/5">
              <p className="text-2xl text-gray-800 font-Outfit font-black">
                ${item.totalCost}
              </p>
              {item.quantity > 1 && (
                <p className="text-gray-400 text-sm">${item.price} each</p>
              )}
            </div>
          </div>
        );
      })}
      <div className="mt-3 md:mt-6 py-3 md:py-6 border-t-2 border-black">
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-end mb-3">
            <span className="text-3xl font-Outfit tracking-tighter font-bold">
              Sub total:
            </span>
            <span className="text-indigo-600 text-4xl font-Outfit font-black">
              ${totalCost}
            </span>
          </div>
          <Button onClick={handleClick} disabled={submissionLoading}>
            Checkout
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }) {
  const categories = await getCategories();
  const allproducts = await getAllProducts();
  const pageProps = { categories: categories, allproducts: allproducts };
  return { props: { ...pageProps } };
}

export default Cart;
