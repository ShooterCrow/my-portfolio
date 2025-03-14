import React from "react";
import { Box, Grid, GridItem, Input, Button, Link, Icon, Text, VStack } from "@chakra-ui/react";
import { SiGithub, SiTiktok, SiYoutube } from "react-icons/si";
import { SlSocialTwitter } from "react-icons/sl";
import { FiMail } from "react-icons/fi";
import Button2 from "../buttons/Button2";
import { Input1 } from "../forms/FormElements";

const SocialsNewsletter = () => {
  return (
    <Box w="100%" p={{base: "", lg: "15px"}}>
      {/* Socials Grid */}
      {/* <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
        <SocialIcon href="#" icon={SiYoutube} bgColor="red.500" />
        <SocialIcon href="#" icon={SiGithub} bgColor="gray.800" />
        <SocialIcon href="#" icon={SiTiktok} bgColor="white" color="black" />
        <SocialIcon href="#" icon={SlSocialTwitter} bgColor="blue.500" />
      </Grid> */}
      
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
