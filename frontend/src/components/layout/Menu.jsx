import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Button2 from '../buttons/Button2'

const Menu = () => {
    return (
        <VStack bg={"#1A1A1A"} position={"fixed"} zIndex={"9"} py={"20px"} px={"20px"} w={"fit-content"} h={"100vh"}>
            <Flex flexDir={{ base: "column-reverse", lg: "row" }} justifyContent={"space-between"}>
                <Flex gap={"10px"} alignItems={"stretch"} flexDir={{base: "row", lg: "column"}}>
                    <Flex height="100%" justifyContent="space-between" flexDir={"column"}>
                        <Image display={{base: "none", lg: "block"}} boxSize={{base: "100px", lg: "200px"}} src="/logo.png" alt="logo" />
                        <Box>
                            <Text my={"20px"} w={{base: "100%", lg: "60%"}} className='sec-text'>
                                MERN Stack Developer with 4+ years of experience building scalable web applications. Victor is Proficient in React, Node.js, MongoDB, and modern tools, I deliver clean, user-centric solutions.
                            </Text>
                            <Flex alignItems={"flex-start"} flexDir={"column"}>
                                <Text fontSize={"14px"} className='sec-text'>[ vj.onyekwere@gmail.com ]</Text>
                                <Text fontSize={"14px"} className='sec-text'>[ vj.onyekwere@gmail.com ]</Text>
                            </Flex>
                            <Flex display={{base: "none", lg: "flex"}} w={"100%"} justifyContent={"flex-start"}>
                                <Flex>
                                    <Button2 text={"Social"} />
                                    <Button2 text={"Social"} />
                                    <Button2 text={"Social"} />
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>

                 <Flex w={"fit-content"} alignContent={"space-between"} flexDir={"column"}>
                    <Link to={"/"}>
                        <Text className='pri-text'>Home</Text>
                    </Link>
                    <Link to={"/projects"}>
                        <Text className='pri-text'>Projects</Text>
                    </Link>
                    <Link to={"/services"}>
                        <Text className='pri-text'>Services</Text>
                    </Link>
                    <Link to={"/contact"}>
                        <Text className='pri-text'>Contact</Text>
                    </Link>
                    <Link to={"/about"}>
                        <Text className='pri-text'>About</Text>
                    </Link>
                </Flex>
            </Flex>

        </VStack>
    )
}

export default React.memo(Menu)
