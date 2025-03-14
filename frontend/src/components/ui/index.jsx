import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"; // ✅ Import mode

// Define global styles
const styles = {
  global: (props) => ({
    "html, body": {
      scrollBehavior: "smooth",
    },
    body: {
      bg: mode("gray.100", "#1A1A1A")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

// Chakra UI theme config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Extend the theme
const theme = extendTheme({ config, styles });

const Provider = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export { Provider };
