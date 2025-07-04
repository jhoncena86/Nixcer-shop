
import Image from "next/image";
import { useState } from "react";

export default function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={images[current]}
          alt={`Slide ${current}`}
          width={500}
          height={500}
          className="object-cover w-full h-96"
        />
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 px-2 py-1 text-white bg-black bg-opacity-50">
        ‹
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 px-2 py-1 text-white bg-black bg-opacity-50">
        ›
      </button>
    </div>
  );
}
