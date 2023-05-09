import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCart } from "react-use-cart";
import Link from "next/link";
import { ChevronDownSmallIcon } from "@/icons";
import ProductReviews from "@/components/product-reviews";

function ProductPageUI({ product, linkImg }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [variantQuantity, setVariantQuantity] = React.useState(1);

  const updateQuantity = (event) =>
    setVariantQuantity(Number(event.target.value));
  const updateVariant = (event) => setActiveVariantId(event.target.value);

  const addToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.title,
        productId: product.id,
        image: product.image,
        price: product.price,
      },
      variantQuantity
    );
  };

  return (
    <div className="md:flex -mx-6 font-Staatliches pb-10 border-gray-500">
      <div className="mb-8 px-6 md:mb-0 md:w-1/2">
        <h3 className="mb-5 text-lg font-medium text-gray-600 font-flexrow">
          <Link href={"/"}>Home</Link>
          {" > "}
          <Link href={"/category"}>Product</Link>
          {" > "}
          <span className="cursor-pointer">{product.title}</span>
        </h3>
        <div className="w-full h-[600px] overflow-hidden relative bg-gainsboro rounded-[50px]">
          {linkImg ? (
            <Image
              fill
              key={product.id}
              src={linkImg[0]}
              //height={primaryImage.height}
              //width={primaryImage.width}
              alt={"Picture of product"}
              className="object-contain"
            />
          ) : null}
        </div>
      </div>
      <div className="px-6 md:py-3 md:w-1/2">
        <h1 className="font-Baskerville text-3xl md:text-6xl mb-3 text-primary leading-tight">
          {product.title}
        </h1>
        <div className="mb-6">
          <p className="font-semibold font-Outfit text-2xl text-slategray">
            ${product.price}
          </p>
        </div>
        <div className="mb-6">
          <p className="font-flexrow leading-loose text-lightgray">
            {product.description}
          </p>
        </div>
        <div className="md:flex md:flex-wrap -mx-3">
          <div className="md:w-1/4 px-3 mb-6">
            <label
              className="block text-sm font-bold font-flexrow tracking-widest uppercase mb-2 text-slategray"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <div className="relative">
              <select
                id="quantity"
                name="quantity"
                value={variantQuantity}
                className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-2 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray"
                onChange={updateQuantity}
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const value = Number(i + 1);

                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                <ChevronDownSmallIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="text-white text-base font-flexrow bg-black  border-0 py-3 px-5 focus:outline-none mt-3"
          onClick={addToCart}
        >
          Add To Cart
        </button>

        <ProductReviews product={product} />
      </div>
    </div>
  );
}

export default ProductPageUI;
