import { useSelector } from "react-redux"
import { selectAllUsers, useGetUsersQuery } from "@/features/users/usersApiSlice"
import { Grid, Badge, useBreakpointValue } from "@chakra-ui/react"
import useAuth from "@/hooks/useAuth"
import UserCard from "./UserCard"
import Loader from "@/components/otherComps/Loader"
import React from "react"

const UsersList = () => {
    const {
        data: users,
        isLoading: isUsersLoading,
        isSuccess: isUsersSuccess,
        isError: isUsersError,
        error: usersError } = useGetUsersQuery("usersList", {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: false
        })


    // Responsive adjustments
    const gridColumns = useBreakpointValue({
        base: "1fr",
        sm: "repeat(auto-fill, minmax(250px, 1fr))",
        md: "repeat(auto-fill, minmax(300px, 1fr))"
    })
    let content
    if (isUsersLoading) content = <Loader />
    if (isUsersSuccess) {
        const { ids, entities } = users
        content = <Grid templateColumns={gridColumns} gap={{ base: 4, md: 6 }}>
            {ids?.map(id => <UserCard key={id} userId={id} />)}
        </Grid>
    }

    return content
}

export default React.memo(UsersList)