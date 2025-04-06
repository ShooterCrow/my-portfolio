import { Flex, Image, Text, Link as ChakraLink } from '@chakra-ui/react'
import React from 'react'
import WaterDropGrid from '../otherComps/WaterDropGrid'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <WaterDropGrid>
                <Flex justifyContent={"center"} flexDir={"column"} alignItems={"center"} minH={{ base: "fit-content", lg: "70vh" }}>
                    <Flex
                        width={"100%"}
                        p={"50px"}
                        display={{ base: "none", lg: "flex" }}
                        alignItems={"center"}
                        justifyContent={"space-between"}>
                        <Flex h={"100%"} gap={"30px"} alignItems={"stretch"} justifyContent={"space-between"} flexDir={"column"} width={"60%"}>
                            <Link to={"/"}>
                                <Image src="/logo.png" alt="Logo" boxSize="100px" />
                            </Link>
                            <Flex alignItems={"flex-end"} w={"70%"}>
    
                            </Flex>
                        </Flex>
                        <Flex gap={20} flexDir={"column"} w={"40%"}>
                            <Flex justifyContent={"space-between"}>
                                <Text lineHeight={"50px"} fontSize={{ base: "16px", lg: "20px" }} color={"whiteAlpha.700"} className='sec-text'>
                                    TITLE
                                </Text>
                                <Text lineHeight={"50px"} textAlign={"end"} className='sec-text'>
                                    <Link to={"/about"}>ABOUT ME</Link> <br />
                                    <Link to={"/services"}>SERVICES</Link> <br />
                                    <Link to={"/projects"}>PROJECTS</Link> <br />
                                    <Link to={"/contact"}>CONTACT</Link>  <br />
                                </Text>
                            </Flex>
                            <Flex justifyContent={"space-between"}>
                                <Text fontSize={{ base: "16px", lg: "20px" }} color={"whiteAlpha.700"} lineHeight={"50px"} className='sec-text'>
                                    CONTACT
                                </Text>
                                <Text lineHeight={"40px"} textAlign={"end"} className='sec-text'>
                                    <ChakraLink
                                        isExternal
                                        textDecoration="none"
                                        _hover={{ color: "#ff4b20", textDecoration: "none" }} href="mailto:victor@webdevlab.site">
                                        victor@webdevlab.site
                                    </ChakraLink>
                                    <br />
                                    <ChakraLink
                                        isExternal
                                        textDecoration="none"
                                        _hover={{ color: "#ff4b20", textDecoration: "none" }} href="tel:+19473654177">
                                        +1 947-365-4177
                                    </ChakraLink>
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex p={"30px"} display={{ base: "flex", lg: "none" }} gap={"10px"} flexDir={"column"} w={"100%"}>
                        <Link to={"/"}>
                            <Image src="/logo.png" alt="Logo" boxSize="100px" />
                        </Link>
                        <Flex justifyContent={"space-between"}>
                            <Text lineHeight={"50px"} fontSize={{ base: "16px", lg: "20px" }} color={"whiteAlpha.700"} className='sec-text'>
                                TITLE
                            </Text>
                            <Text lineHeight={"50px"} textAlign={"end"} className='sec-text'>
                                <Link to={"/about"}>ABOUT ME</Link> <br />
                                <Link to={"/services"}>SERVICES</Link> <br />
                                <Link to={"/projects"}>PROJECTS</Link> <br />
                                <Link to={"/contact"}>CONTACT</Link>  <br />
                            </Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                            <Text fontSize={{ base: "16px", lg: "20px" }} color={"whiteAlpha.700"} lineHeight={"50px"} className='sec-text'>
                                CONTACT
                            </Text>
                            <Text lineHeight={"50px"} textAlign={"end"} className='sec-text'>
                                victor@webdevlab.site <br />
                                +1 9473654177 <br />
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </WaterDropGrid>
            <Flex px={"50px"} flexDir={{ base: "column", lg: "row" }} py={"20px"} justifyContent={{ base: "center", lg: "space-between" }} position={""} width={"100%"}>
                <Text textAlign={"center"} fontSize={{ base: "14px", lg: "16px" }} className='sec-text'>
                    © 2025 Copyright - VIC | Made with ❤️ by "VIC"
                </Text>
                <Text textAlign={"center"} fontSize={{ base: "12px", lg: "16px" }} className='sec-text'>
                    Certifications | <Link to={"design-process"}>Design Process</Link> | Site Map
                </Text>
            </Flex>
        </footer>
    )
}

export default Footer
