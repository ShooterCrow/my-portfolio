import { Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Button1 from './buttons/Button1'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"} minH={"90vh"}>
            <VStack>
                <img src="/sadface.gif" width={300} height={300} alt="Not found gif" />
                <Text className='sec-text' fontSize={"30px"}>404 Not Found</Text>
                <Button1 link={"/"} text={"Go Back Home"} />
            </VStack>
        </Flex>
    )
}

export default NotFound
