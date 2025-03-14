import { useGetUsersQuery } from "@/features/users/usersApiSlice"
import {
    Box, Flex, Heading, Text, Divider, Badge,
    useColorModeValue, useBreakpointValue
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Button2 from "@/components/buttons/Button2"
import useAuth from "@/hooks/useAuth"
import React from "react"

const UserCard = ({ userId, isCurrentUser }) => {
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const cardBg = useColorModeValue("white", "gray.800")
    const borderColor = useColorModeValue("gray.200", "gray.600")
    const buttonSize = useBreakpointValue({ base: "sm", md: "md" })

    if (!user) return null

    const {username} = useAuth()
    
    return (
        <Box
            key={userId}
            p={{ base: 3, md: 5 }}
            borderWidth="1px"
            borderRadius="md"
            bg={cardBg}
            borderColor={borderColor}
            transition="all 0.2s"
            _hover={{ shadow: "md", transform: "translateY(-2px)" }}>
            <Flex justifyContent="space-between" mb={2} flexWrap="wrap">
                <Heading size="sm" className="pri-text">{user.username}</Heading>
                <Badge colorScheme={user.username === username ? "green" : "gray"}>
                    {user.username === username ? "You" : "User"}
                </Badge>
            </Flex>
            <Text mb={3} fontSize={{ base: "sm", md: "md" }}>{user.firstname} {user.lastname}</Text>
            <Divider mb={3} />
            <Flex justifyContent="flex-end">
                <Link to={`/users/${user.id}/edit`}>
                    <Button2 text="Edit User" func={() => { }} size={buttonSize} />
                </Link>
            </Flex>
        </Box>
    )
}

export default React.memo(UserCard)