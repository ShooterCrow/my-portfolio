import React from "react";
import { Box, Flex, Image, keyframes } from "@chakra-ui/react";

// Define the scroll animation for continuous movement
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeSlider1 = () => {
  // Image URLs
  const images = [
    "https://cdn.prod.website-files.com/634f69e43807ee7b3741ad25/634f6d8b3807ee593941e3f1_logoipsum-287.svg",
    "https://cdn.prod.website-files.com/634f69e43807ee7b3741ad25/634f6d88cb905b0d0744223f_logoipsum-286%20(1).svg",
  ];

  // Text content
  const texts = [
    // Funny Developer Quotes
    "Programming is like writing a book... except if you miss a single comma, the whole thing makes no sense. – Unknown",
    "The best code is no code at all. – Jeff Atwood",
    "It works on my machine. – Every Developer Ever",
    "Give a man a program, and he’ll be frustrated for a day. Teach a man to program, and he’ll be frustrated for a lifetime. – Unknown",
    "If debugging is the process of removing bugs, then programming must be the process of putting them in. – Edsger Dijkstra",
  
    // Funny Developer Sayings
    "There are two ways to write error-free programs; only the third one works.",
    "99 little bugs in the code, 99 little bugs. Take one down, patch it around, 127 little bugs in the code!",
    "A programmer's wife tells him: 'Go to the store and get a loaf of bread. If they have eggs, get a dozen.' He comes back with 12 loaves of bread.",
    "Why do Java developers wear glasses? Because they don’t C#.",
    "I don’t need a life, I’m a developer. I have servers to maintain!"
  ];

  return (
    <Box zIndex={7} position="relative" width="100%" overflow="hidden" py={10}>
      {/* Text Marquee (Top, slight left tilt) */}
      <Box
        width="100%"
        bg="rgba(255, 255, 255, 0.1)"
        py={4}
        overflow="hidden"
        position="absolute"
        top="10%" // Positioning to avoid overlap
        left={0}
        transform="rotate(-1deg)" // Subtle tilt
        backdropFilter="blur(10px)"
        boxShadow="0px 4px 30px rgba(255, 255, 255, 0.3)"
        zIndex={2}
      >
        <Box
          display="flex"
          width="fit-content"
          animation={`${scroll} 60s linear infinite`}
        >
          {/* Multiple copies for continuous scrolling */}
          <Box display="flex" whiteSpace="nowrap">
            {texts.map((text, i) => (
              <Box key={`text1-${i}`} fontSize="xl" fontWeight="bold" mx={4}>
                {text}
              </Box>
            ))}
          </Box>
          <Box display="flex" whiteSpace="nowrap">
            {texts.map((text, i) => (
              <Box key={`text2-${i}`} fontSize="xl" fontWeight="bold" mx={4}>
                {text}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Image Marquee (Bottom, slight right tilt) */}
      <Box
        width="100%"
        py={6}
        overflow="hidden"
        position="absolute"
        bottom="10%"
        left={0}
        transform="rotate(2deg)" // Opposite tilt for the X shape
        zIndex={1}
      >
        <Box
          display="flex"
          justifyContent={"space-between"}
          gap={20}
          width="100%"
          animation={`${scroll} 20s linear infinite`}
          sx={{
            "& > div": {
              display: "flex",
              gap: 4,
              alignItems: "center",
              marginRight: "0px",
            },
          }}
        >
          {/* First set of images */}
          <Flex>
            {images.map((img, idx) => (
              <Image
                key={`img1-${idx}`}
                src={img}
                alt=""
                loading="eager"
                height="50px"
                objectFit="contain"
                mx={2}
              />
            ))}
          </Flex>

          {/* Duplicate set to ensure continuous flow */}
          <Flex>
            {images.map((img, idx) => (
              <Image
                key={`img2-${idx}`}
                src={img}
                alt=""
                loading="eager"
                height="50px"
                objectFit="contain"
                mx={2}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default MarqueeSlider1;
