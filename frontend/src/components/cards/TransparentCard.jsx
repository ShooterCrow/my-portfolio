import { Box, Image, Text, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";

const TranparentCard = ({ effect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      w="250px"
      h="400px"
      borderRadius="8px"
      boxShadow="lg"
      overflow="hidden"
      position="relative"
      transition="transform 0.65s ease"
      _hover={{ transform: "scale(1.1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bgGradient={
          effect === "color"
            ? "linear(to-b, blue.900, red.400)"
            : "linear(to-b, black, rgba(0,0,0,0.5))"
        }
      >
        <Image
          src="https://c1.staticflickr.com/4/3935/32253842574_d3d449ab86_c.jpg"
          w="full"
          h="full"
          objectFit="cover"
          filter={effect === "blur" && isHovered ? "blur(3px)" : "none"}
          transition="all 0.65s ease"
          opacity={effect === "color" && isHovered ? 0.8 : 1}
        />
      </Box>
      
      {/* Profile Image */}
      <VStack position="relative" zIndex={2} mt="20%">
        <Image
          borderRadius="full"
          boxSize="80px"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Neil_Armstrong.jpg"
          filter={isHovered ? "grayscale(0)" : "grayscale(50%)"}
          transition="all 0.65s ease"
        />
      </VStack>
      
      {/* Card Body */}
      <VStack position="relative" zIndex={2} p={4} textAlign="center">
        <Text fontSize="xl" fontWeight="bold" color="white">
          Neil Armstrong
        </Text>
        <Text fontSize="sm" color="blue.300" textTransform="uppercase">
          Astronaut & Engineer
        </Text>
        {isHovered && (
          <Text fontSize="md" color="white" opacity={0.8} transition="all 0.65s ease">
            American astronaut, engineer, and the first person to walk on the Moon.
          </Text>
        )}
      </VStack>
      
      {/* Footer */}
      {isHovered && (
        <Text
          position="absolute"
          bottom={4}
          left={4}
          fontSize="xs"
          color="gray.400"
          transition="all 0.65s ease"
        >
          Feb 10 2018
        </Text>
      )}
    </Box>
  );
};

export default TranparentCard

// export default function CardVariants() {
//   return (
//     <VStack spacing={10}>
//       <Card effect="zoom" />
//       <Card effect="blur" />
//       <Card effect="color" />
//     </VStack>
//   );
// }
