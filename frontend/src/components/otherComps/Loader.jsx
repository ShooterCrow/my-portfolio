import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Create a motion-enabled version of Chakra's Box
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

const sizeConfig = {
  small: {
    height: "24px",
    width: "4px",
    gap: "2px"
  },
  medium: {
    height: "36px",
    width: "6px",
    gap: "3px"
  },
  large: {
    height: "48px",
    width: "8px",
    gap: "4px"
  }
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const Loader = ({ size = "large" }) => {
  const { height, width, gap } = sizeConfig[size];

  return (
    <MotionFlex
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      gap={gap}
      align="center"
      justify="center"
    >
      <MotionBox variants={variants} height={height} width={width} bg="white" />
      <MotionBox variants={variants} height={height} width={width} bg="white" />
      <MotionBox variants={variants} height={height} width={width} bg="white" />
      <MotionBox variants={variants} height={height} width={width} bg="white" />
      <MotionBox variants={variants} height={height} width={width} bg="white" />
    </MotionFlex>
  );
};

export default Loader;