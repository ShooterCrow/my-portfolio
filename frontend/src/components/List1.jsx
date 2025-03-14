import React, { useState, useMemo, useCallback } from "react";
import { Box, Text, Flex, Image, IconButton } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";

// Move awards data outside component to prevent recreation on each render
const awards = [
  { title: "Responsive Web Design", org: "FreeCodeCamp", year: "2022", image: "/fcc.jpeg" },
  { title: "MongoDB, Express, React...", org: "UDEMY ACADEMY", year: "2022", image: "/udemy.png" },
  { title: "HTML, CSS JavaScript", org: "FreeCodeCamp", year: "2022", image: "/fcc.jpeg" },
  { title: "MERN Stack Blog", org: "UDEMY", year: "2023", image: "/udemy.png" },
];

// Memoized Award Item component
const AwardItem = React.memo(({ award, index, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <Flex
      key={`award-${index}`}
      align="center"
      justify="space-between"
      p={8}
      borderRadius="md"
      position="relative"
      cursor="pointer"
      transition="all 0.3s ease-in-out"
      borderTop="1px solid transparent"
      borderBottom="1px solid transparent"
      _hover={{ borderColor: "gray.700" }}
      bg={isHovered ? "gray.900" : "transparent"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}  >
      <Text w={"33%"} 
        className="sec-text" 
        fontWeight="bold" 
        color={isHovered ? "red.400" : "white"}>
        {award.title}
      </Text>
      <Text textAlign={"end"} w={"33%"} className="sec-text" fontSize="sm">{award.org}</Text>
      <Text textAlign={"end"} w={"33%"} className="sec-text" fontSize="sm" opacity={0.6}>[ {award.year} ]</Text>

      {isHovered && (
        <>
          <Image
            src={award.image}
            position="absolute"
            left="40%"
            top="-60px"
            transform="translateX(-50%) rotate(-5deg)"
            boxSize="120px"
            objectFit="cover"
            borderRadius="md"
            boxShadow="lg"
            transition="all 0.3s ease-in-out"
            loading="lazy"
          />
          <IconButton
            icon={<ArrowUpRight size={20} />}
            position="absolute"
            right="20px"
            bg="white"
            color="red.500"
            borderRadius="full"
            size="sm"
            aria-label="View award details"
          />
        </>
      )}
    </Flex>
  );
});

const List1 = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Memoized callbacks for mouse events
  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Memoized award items for render optimization
  const awardItems = useMemo(() => {
    return awards.map((award, index) => (
      <AwardItem
        key={`award-${index}`}
        award={award}
        index={index}
        isHovered={hoveredIndex === index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      />
    ));
  }, [hoveredIndex]);

  return (
    <Box color="white" p={8}>
      {awardItems}
    </Box>
  );
};

export default React.memo(List1);