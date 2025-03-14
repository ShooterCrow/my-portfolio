import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Text, Avatar, Flex } from "@chakra-ui/react";
import { Quote, QuoteIcon, TextQuote } from "lucide-react";

const Testimonials1 = ({ name, image, role, text }) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    return (
        <Box
            ref={sectionRef}
            height="fit-content"
            color="white"
            position="relative"
            display={{ base: "flex", xl: "flex" }}
            justifyContent="flex-end"
            alignItems="center"
            w="100%">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}>
                <Box
                    bg="#2b2b2b"
                    border={"1px solid #2b2b2b"}
                    py={"40px"}
                    px={"40px"}
                    borderRadius="xs"
                    maxW="600px"
                    textAlign="center"
                    boxShadow="0px 4px 15px rgba(0, 0, 0, 0.2)">
                    <Flex alignItems={"center"} gap={{base: "7px", lg:"10px"}}>
                        <Avatar name={name} src={image} bg='gray.500' />
                        <Flex alignItems={"flex-start"} flexDir={"column"}>
                            <Text className="sec-text" fontSize="lg" fontWeight="bold" mt={3}>
                                {name}
                            </Text>
                            <Text className="sec-text" fontSize="sm" color="gray.400">
                                {role}
                            </Text>
                        </Flex>
                    </Flex>
                    <Box ml={{base: "0px", lg: "40px"}}>
                        <Text textAlign={"start"} className="sec-text" mt={3} fontSize="md" fontStyle="italic">
                            <Quote color="#ff4b20" size={18} style={{ display: "inline", marginRight: "5px" }} />
                            {text}
                            <Quote color="#ff4b20" size={18} style={{ display: "inline", marginLeft: "5px" }} />
                        </Text>
                    </Box>

                </Box>
            </motion.div>
        </Box>
    );
};

export default React.memo(Testimonials1);