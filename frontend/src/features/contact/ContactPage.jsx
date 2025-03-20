import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Flex,
    VStack,
    HStack,
    Icon,
    useColorModeValue
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import Form1 from '@/components/forms/Form1';
import Button2 from '@/components/buttons/Button2';

export const ContactSection = () => {
    return (<Flex
        className="parallax"
        position="relative"
        px={{ base: "20px", lg: "100px" }}
        py="30px"
        justifyContent="space-between"
        flexDir="column"
        minH="100vh"
        bgImage="url('/me.jpeg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        _before={{
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "calc(100% + 5)",
            bg: "rgba(0, 0, 0, 0.88)", // Adjust the opacity as needed
            zIndex: 0,
        }} >
        <Flex id="contact" flexDir={{ base: "column", lg: "row" }} py={{ base: "50px", lg: "100px" }} zIndex={1}>
            <Flex flexDir={"column"} justifyContent={"flex-start"}>
                <Text className="pri-text">
                    LET'S <br />
                    WORK TOGETHER
                </Text>
                <Text className="sec-text">
                    [ YOU DREAM, WE BUILD ]
                </Text>

            </Flex>
            <Form1 />
        </Flex>
        {/* BELOW */}
        <Flex flexDir={{ base: "column", lg: "row" }} alignItems={"center"} zIndex={1} justifyContent={"space-between"}>
            <VStack>
                <Text className="pri-text">
                    CONTACT
                </Text>
                <Text textAlign={"center"} className="sec-text">
                    [ vj.onyekwere@gmail.com ] <br />
                    [ +1 9473654177 ]
                </Text>
            </VStack>
            <Flex h={"fit-content"} gap={"15px"} mt={"20px"} flexDir={{ base: "column", md: "row" }}>
                <Button2 useChakraLink isExternal link={"https://linkedin.com/in/victor-j-o"} text={"LinkedIn"} />
                <Button2 useChakraLink isExternal link={"https://instagram.com/javascriptjunkie1"}  text={"Instagram"} />
                <Button2 useChakraLink isExternal link={"https://github.com/ShooterCrow"}  text={"Github"} />
            </Flex>
        </Flex>
    </Flex>)
}

export const ContactPage = () => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Container maxW="100%" mt={"100px"} p={0}>
            <Text my={"30px"} textAlign={"center"} className='pri-text' >Pushing boundaries, shaping <br /> extraordinary possibilities</Text>
            <ContactSection />
        </Container>
    );
};

export default ContactPage;