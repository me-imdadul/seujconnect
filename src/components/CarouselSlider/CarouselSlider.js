import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import paragraph from "@/utils/paragraph";

const CarouselSlider = ({ blogPosts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
    }, 3000); // 3-second interval

    return () => clearInterval(interval);
  }, [blogPosts.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + blogPosts.length) % blogPosts.length
    );
  };

  return (
    <div className="relative w-2/3 h-[70vh] mx-auto overflow-hidden rounded-lg shadow-lg">
      <button
        onClick={handlePrev}
        className="absolute hover:bg-lime-400 duration-300 transition-all top-1/2 z-20 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 text-white rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute hover:bg-lime-400 duration-300 transition-all top-1/2 z-20 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 text-white rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        &gt;
      </button>

      <AnimatePresence>
        {blogPosts.map(
          (post, index) =>
            index === currentIndex && (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 text-center"
              >
                <img
                  src={post.thumbimage || "/not-found.jpg"}
                  alt={post.title}
                  className="w-full absolute h-full z-1 object-cover rounded-md mb-4"
                />
                <h2 className="absolute bottom-28 left-0 right-0 text-2xl z-10 font-semibold text-lime-400">
                  {post.title}
                </h2>
                <p className="absolute bottom-20 left-0 right-0 mt-2 z-10 text-gray-400">
                  {paragraph(post.content)}
                </p>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="absolute z-20 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {blogPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-lime-400" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselSlider;
