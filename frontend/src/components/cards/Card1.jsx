import React from "react";
import { Box, Grid, GridItem, Text, Icon, Flex } from "@chakra-ui/react";
import { ArrowUpRight, Eye, Clock } from "lucide-react";

const articles = [
  { title: "The Framer Motion Crash Course", time: "12 MIN", image: "/me.jpeg" },
  { title: "Horizontal Scroll Animations", time: "5 MIN", image: "/me.jpeg" },
];

const Card1 = () => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={2} w={"100%"} p={4}>
      {/* Newsletter Card */}
      <GridItem bg="black" color="white" border="1px solid gray" p={6} display="flex" flexDirection="column" justifyContent="space-between">
        <Text className="sec-text" fontSize="lg" fontWeight="bold">
          JOIN OUR <br />
          WEEKLY <br />
          NEWSLETTER
        </Text>
        <Flex align="center" justify="space-between" mt={4}>
          <Text className="sec-text" fontSize="xs" opacity={0.6}>YOUR.BEEHIIV.COM</Text>
          <Icon as={ArrowUpRight} boxSize={4} />
        </Flex>
      </GridItem>

      {/* Article Cards */}
      {articles.map((article, index) => (
        <GridItem key={index} className="article-card">
          {/* Additional Top-Right & Bottom-Left Borders */}
          <Box className="corner-top-right" />
          <Box className="corner-bottom-left" />

          {/* Background Image */}
          <Box className="bg-image" style={{ backgroundImage: `url(${article.image})` }} />

          <Flex align="center" justify="space-between" fontSize="xs" opacity={0.6} zIndex={2}>
            <Flex align="center">
              <Icon as={Clock} boxSize={3} mr={1} />
              <Text className="sec-text" >{article.time}</Text>
            </Flex>
            <Icon as={Eye} boxSize={4} />
          </Flex>

          {/* Title */}
          <Text className="sec-text article-title">{article.title}</Text>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Card1;
