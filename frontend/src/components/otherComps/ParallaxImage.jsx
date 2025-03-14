import { Box, Flex, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

// Custom hook for parallax animation calculations
const useParallaxAnimation = (ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Unified parallax effect
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return { yParallax };
};

const ParallaxImage = ({ 
  imagePath, 
  height = "50vh", 
  showOverlay = true, 
  showContent = true,
  title = "", 
  technologies = [],
  linkTo = "", 
  position = "center",
  blurAmount = "10px"
}) => {
  const ref = useRef(null);
  const { yParallax } = useParallaxAnimation(ref);

  return (
    <Box position="relative" ref={ref} width="100%">
      <motion.div
        style={{
          y: yParallax,
          width: "100%",
          position: "relative",
          willChange: "transform" // Optimize animation performance
        }}>
        {/* Parallax Image Container */}
        <Box position="relative" width="100%" height={height} overflow="hidden">
          {/* Overlay with Blur Effect (Optional) */}
          {showOverlay && (
            <Box
              position="absolute"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.5)"
              backdropFilter={`blur(${blurAmount})`}
              zIndex="1" 
            />
          )}

          {/* Background Image */}
          <Box
            position="absolute"
            width="100%"
            height="100%"
            backgroundImage={`url(${imagePath})`}
            backgroundSize="cover"
            backgroundPosition={position}
            zIndex="0" 
          />

          {/* Content (Optional) */}
          {showContent && (
            <Box
              position="absolute"
              width="100%"
              height="100%"
              display="flex"
              alignItems="flex-end"
              justifyContent="flex-end"
              p="20px"
              zIndex="2">
              <Flex flexDir="column">
                {linkTo ? (
                  <Link to={linkTo}>
                    <Text
                      textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                      className="pri-text"
                      fontSize={{ base: "30px", md: "40px" }}
                      textAlign="end"
                      color="white">
                      {title}
                    </Text>
                  </Link>
                ) : (
                  <Text
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                    className="pri-text"
                    fontSize={{ base: "30px", md: "40px" }}
                    textAlign="end"
                    color="white">
                    {title}
                  </Text>
                )}

                {/* Technologies Tags */}
                {technologies.length > 0 && (
                  <Flex justifyContent="flex-end" gap="10px" wrap="wrap">
                    {technologies.map((tech, index) => (
                      <Text
                        color={"whiteAlpha.800"}
                        key={`tech-${index}`}
                        className="sec-text"
                      >
                        [{tech}]
                      </Text>
                    ))}
                  </Flex>
                )}
              </Flex>
            </Box>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default React.memo(ParallaxImage);