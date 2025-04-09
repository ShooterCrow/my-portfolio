import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Button1 = ({ text, subText, func, link = "", useChakraLink, isExternal = false }) => {
  const buttonContent = (
    <button>
      <Box onClick={func} className="button1-container">
        <Flex gap={"10px"} className="button1-style">
          <div className="left-border"></div>
          <div className="right-border"></div>
          <div className="content-container" data-hover={subText || text}>
            <h3 className="button1-text">{text}</h3>
          </div>
        {isExternal && <FaExternalLinkAlt />}
        </Flex>
      </Box>
    </button>
  );

  if (link) {
    return useChakraLink ? (
      <ChakraLink href={link}>{buttonContent}</ChakraLink>
    ) : (
      <RouterLink to={link}>{buttonContent}</RouterLink>
    );
  }

  return buttonContent;
};

export default React.memo(Button1);