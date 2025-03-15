import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Button2 = ({ text, subText, func, link = "", useChakraLink = false, isExternal = false }) => {
  const buttonContent = (
    <Box onClick={func} className="button2-container">
      <Flex gap={"10px"} className="button2-style">
        <div className="content-container" data-hover={subText || text}>
          <h3 className="button2-text">{text}</h3>
        </div>
        {isExternal && <FaExternalLinkAlt />}
      </Flex>
    </Box>
  );

  if (link) {
    return useChakraLink ? (
      <ChakraLink isExternal href={link}>{buttonContent}</ChakraLink>
    ) : (
      <RouterLink to={link}>{buttonContent}</RouterLink>
    );
  }

  return buttonContent;
};

export default React.memo(Button2);