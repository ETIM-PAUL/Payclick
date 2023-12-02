import React, { useState, useEffect } from "react";

const TypingEffect = ({ phrase }) => {
  const words = phrase !== null && phrase.split(" ");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (phrase !== null) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, 100); // Change the interval to control the speed of the animation

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      {phrase !== null ? (
        <span>
          {words.map((word, index) => (
            <span key={index}>
              {index < currentWordIndex ? `${word} ` : ""}
            </span>
          ))}
          {currentWordIndex < words.length && "..."}
        </span>
      ) : (
        <span className="text-sm font-bold">No Response, Try Again.</span>
      )}
    </>
  );
};

export default TypingEffect;

          