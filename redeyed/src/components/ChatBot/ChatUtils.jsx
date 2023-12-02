import { BsFillSunFill } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoWarningOutline } from "react-icons//io5";

export const homePage = [
  {
    title: "Examples",
    icon: <BsFillSunFill />,
    details: [
      "Explain Quantum Computing in simple terms",
      "Got any creative ideas for a ten year old birthday",
      "How do I make an HTTP request using Javascript",
    ],
  },
  {
    title: "Capabilities",
    icon: <AiOutlineThunderbolt />,
    details: [
      "Explain Quantum Computing in simple terms",
      "Got any creative ideas for a ten year old birthday",
      "How do I make an HTTP request using Javascript",
    ],
  },
  {
    title: "Limitations",
    icon: <IoWarningOutline />,
    details: [
      "Explain Quantum Computing in simple terms",
      "Got any creative ideas for a ten year old birthday",
      "How do I make an HTTP request using Javascript",
    ],
  },
];

export function consoleWithEllipsis(phrase) {
  const words = phrase.split(" ");
  let delay = 0;

  words.forEach((word) => {
    setTimeout(() => {
      console.log("..." + word);
    }, delay);

    // Increment the delay for the next word
    delay += 1000; // You can adjust the delay time (in milliseconds) as per your preference
  });
}

          