import React from "react";
import { Box, Grid, GridItem, Input, Button, Link, Icon, Text, VStack } from "@chakra-ui/react";
import Button2 from "../buttons/Button2";
import { Input1 } from "../forms/FormElements";

const SocialsNewsletter = () => {
  return (
    <Box w="100%" p={{base: "", lg: "15px"}}>
      
      {/* Newsletter Section */}
      <VStack mt={6} p={4} borderRadius="xs" border="1px solid" borderColor={"whiteAlpha.300"} bg="whiteAlpha.200">
        <Text className="sec-text" fontWeight={"bold"}>[ Newsletter ]</Text>
        <Input1  placeholder="Enter your email" variant="filled" mb={3} />
        <Button2 text={"Stay Updated"} />
      </VStack>
    </Box>
  );
};

const SocialIcon = ({ href, icon, bgColor, color = "white" }) => {
  return (
    <GridItem
      as={Link}
      href={href}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      color={color}
      borderRadius="md"
      p={4}
      _hover={{ transform: "scale(1.1)", transition: "0.3s" }}
    >
      <Icon as={icon} w={8} h={8} />
    </GridItem>
  );
};

export default SocialsNewsletter;
