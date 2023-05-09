import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import Image from "next/image";
import Link from "next/link";
import { convertTitleToSlug } from "@/utils/callback";

const HeroSlider = ({ products }) => {
  let [ref, { width }] = useMeasure();
  let [count, setCount] = useState(1);
  let prev = usePrevious(count);
  let direction = count > prev ? 1 : -1;

  return (
    <div className="w-full h-[680px] sm:h-[450px] relative">
      <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-between items-center px-4">
        <button
          className="p-3 bg-white/[0.8] font-bold"
          onClick={() => {
            if (count <= 0) {
              setCount(products.length - 1);
            } else {
              setCount(count - 1);
            }
          }}
        >
          {"<"}
        </button>
        <button
          className="p-3 bg-white/[0.8] font-bold"
          onClick={() => {
            if (count >= products.length - 1) {
              setCount(0);
            } else {
              setCount(count + 1);
            }
          }}
        >
          {">"}
        </button>
      </div>
      <div
        ref={ref}
        className="relative flex w-full h-full items-center justify-center overflow-hidden bg-body_color"
      >
        <AnimatePresence custom={{ direction, width }}>
          <motion.div
            key={count}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={{ direction, width }}
            className={`absolute flex flex-col sm:flex-row h-full w-full text-3xl font-bold`}
          >
            <div className="relative h-[400px] sm:h-full w-full sm:flex-grow">
              <Image
                fill
                objectFit="contain"
                src={products[count].image}
                alt={products[count].title}
                priority
              />
            </div>
            <div className="w-full sm:w-[600px] h-auto sm:h-full px-5 py-10 flex flex-col justify-between">
              <div>
                <h3 className="font-Baskerville font-light text-4xl my-3">
                  {products[count].title}
                </h3>

                <p className="font-flexrow font-light text-sm  my-5">
                  {products[count].description}
                </p>
              </div>
              <Link
                href={`/product/${convertTitleToSlug(products[count].title)}`}
                className="relative z-[52] w-32 h-12 bg-white text-gray-800 font-flexrow text-sm mt-5 flex justify-center items-center"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSlider;

let variants = {
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({ x: direction * -width }),
};

let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

function usePrevious(state) {
  let [tuple, setTuple] = useState([null, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }

  return tuple[0];
}
