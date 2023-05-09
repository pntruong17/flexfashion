import Link from "next/link";
import Image from "next/image";
import { convertTitleToSlug } from "@/utils/callback";
import { HeartIcon, HeartIconAnimate } from "./icons";
import { useState, useEffect, useRef } from "react";
//import { useLikeContext } from "@/context/like-context";

function ProductCard({ id, image, title, price, rating, liked }) {
  return (
    <article key={id}>
      <div className="group no-underline w-full min-h-[550px] ">
        <div className="cursor-pointer w-full min-h-[550px] border p-5 overflow-hidden relative flex flex-col justify-between">
          <Link
            href={`/product/${convertTitleToSlug(title)}`}
            className="relative w-full flex-grow overflow-hidden"
          >
            {image ? (
              <Image
                key={convertTitleToSlug(title)}
                fill
                src={`${image}`}
                alt={title}
                className="object-contain"
              />
            ) : null}
          </Link>
          <div className="w-full absolute top-0 left-0 z-20 flex flex-row justify-between items-center p-3">
            <div className="w-10 h-10">
              <HeartIconAnimate liked={liked} id={id} />
            </div>
            <p className="text-gray-800 text-xl font-medium font-Outfit rounded-full bg-white py-2 px-3">
              ${price}
            </p>
          </div>
          <Link
            href={`/product/${convertTitleToSlug(title)}`}
            className="w-full h-auto pt-5"
          >
            <p className="w-full rounded-[60px] bg-white font-Baskerville text-xl sm:text-2xl font-thin hover:text-indigo-600">
              {title}
            </p>
            <p className="w-full bg-white font-Outfit text-sm font-bold text-indigo-950 mt-3">
              Rating: {rating.rate}
            </p>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
