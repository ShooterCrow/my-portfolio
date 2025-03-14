import {
    Box, Flex, Heading, Text,
    useColorModeValue, useBreakpointValue
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Button2 from "@/components/buttons/Button2"
import { useGetContactMsgsQuery } from "./contactApiSlice"
import React from "react"

const ContactMsgBlock = ({ contactId }) => {
    const { contactMsgs } = useGetContactMsgsQuery("contactMsgsList", {
        selectFromResult: ({ data }) => ({
            contactMsgs: data.entities[contactId],
        }),
    })


    const cardBg = useColorModeValue("white", "gray.800")
    const borderColor = useColorModeValue("gray.200", "gray.600")
    const buttonSize = useBreakpointValue({ base: "sm", md: "md" })

    if (!contactMsgs) return null

    return (
        <Box
            key={contactMsgs.id}
            p={{ base: 3, md: 5 }}
            borderWidth="1px"
            borderRadius="md"
            bg={cardBg}
            borderColor={borderColor}>
            <Flex
                justifyContent="space-between"
                mb={2}
                flexDirection={{ base: "column", sm: "row" }}>
                <Heading size="sm" className="pri-text" mb={{ base: 1, sm: 0 }}>{contactMsgs.name}</Heading>
                <Text fontSize="xs" color="gray.500">
                    {new Date(contactMsgs.createdAt).toLocaleDateString()}
                </Text>
            </Flex>
            <Text mb={3} fontSize={{ base: "sm", md: "md" }}>{contactMsgs.message}</Text>
            <Flex justifyContent="flex-end">
                <Link to={`/contact/${contactMsgs.id}/reply`}>
                    <Button2 text="Reply" func={() => { }} size={buttonSize} />
                </Link>
            </Flex>
        </Box>
    )
}

export default React.memo(ContactMsgBlock)