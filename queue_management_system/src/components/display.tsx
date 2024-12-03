import { motion } from "framer-motion";
import Container from "./container";

interface DisplayProps {
  counterName: string;
  counter: number;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}

const Display: React.FC<DisplayProps> = ({
  counterName,
  counter,
  isAnimating,
  setIsAnimating,
}) => {
  return (
    <motion.div
      key={`display-${counter}`} // Change key to force re-render on counter change
      animate={
        isAnimating
          ? {
              y: [0, -10, 0], // Bounce effect
              rotate: [0, 10, -10, 0], // Small shake rotation
              scale: [1, 1.1, 1], // Slight scale up and back to normal
            }
          : {}
      }
      onAnimationComplete={() => setIsAnimating(false)} // Reset animation state
      transition={{ duration: 0.6, ease: "easeOut" }} // Smooth easing for bounce
    >
      <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-white text-center text-2xl font-bold mb-4">Counter: {counterName.at(-1)}</h2>
      </div>
      <Container>
        <div className="flex items-center space-x-4 ">
          <span className="countdown font-mono text-6xl ">
            {counter} {/* Display the counter directly */}
          </span>
        </div>
      </Container>
    </motion.div>
  );
};

export default Display;
