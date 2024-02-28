interface carouselProps {
  images: string[];
  selectedImage: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
  className: string;
}

export default function Carousel({
  images,
  selectedImage,
  setSelectedImage,
  className,
}: carouselProps) {
  const nextImg = () => {
    if (selectedImage < images.length - 1)
      setSelectedImage((current) => current + 1);
    else setSelectedImage(0);
    console.log("next");
  };

  const prevImg = () => {
    if (selectedImage !== 0) setSelectedImage((current) => current - 1);
    else setSelectedImage(images.length - 1);
    console.log("prev");
  };

  const changeImg = (i: number) => {
    setSelectedImage(i);
  };

  return (
    <div id="indicators-carousel" className={`${className} w-full`}>
      {/* photo */}
      <div className="h-56 rounded-lg md:h-96">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={images[selectedImage]}
            className="max-h-full max-w-full"
            alt="img"
          />
        </div>
      </div>
      {/* forth back buttons */}
      <div className="flex w-full justify-between">
        <button
          type="button"
          className="flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevImg}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/50 group-hover:bg-gray-100/85 border group-hover:border-gray-300">
            <svg
              className="w-4 h-4 rtl:rotate-180 text-gray-400 group-hover:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={nextImg}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/50 group-hover:bg-gray-100/85 border group-hover:border-gray-300">
            <svg
              className="w-4 h-4 rtl:rotate-180 text-gray-400 group-hover:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      {/* photo list */}
      <div className="w-full h-20 flex justify-center items-center overflow-x-auto gap-3 md:gap-8">
        {images.map((image, i) => (
          <div
            onClick={() => changeImg(i)}
            key={`div${i}`}
            className={`${
              i === selectedImage
                ? "outline outline-gray-500"
                : "hover:border-2"
            } w-14 h-14 flex items-center justify-center cursor-pointer rounded-sm outline-offset-2 outline-2`}
          >
            <img
              src={image}
              key={`img${i}`}
              className="max-h-full max-w-full"
              alt="img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
