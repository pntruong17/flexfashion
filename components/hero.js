import React from "react";
import Image from "next/image";
import HeroSlider from "./hero-slider";

const Hero = ({ products }) => {
  return (
    <div className="w-full h-auto overflow-hidden py-5">
      <HeroSlider products={products} />
    </div>
  );
};

export default Hero;
