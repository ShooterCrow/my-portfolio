import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Create a motion-enabled version of Chakra's Box
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

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

const Loader = () => {
  return (
    <MotionFlex
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      gap="4px"
    >
      <MotionBox variants={variants} height="48px" width="8px" bg="white" />
      <MotionBox variants={variants} height="48px" width="8px" bg="white" />
      <MotionBox variants={variants} height="48px" width="8px" bg="white" />
      <MotionBox variants={variants} height="48px" width="8px" bg="white" />
      <MotionBox variants={variants} height="48px" width="8px" bg="white" />
    </MotionFlex>
  );
};

export default Loader;