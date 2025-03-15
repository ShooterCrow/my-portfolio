import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllServices, useGetServicesQuery } from './ServicesApiSlice'
import Loader from '@/components/otherComps/Loader'
import { ServiceCard } from './ServiceCard'

const ServicesList = () => {
    const { data: services,
        isLoading,
        isSuccess,
        isError,
        error } = useGetServicesQuery("servicesList", {
            refetchOnFocus: false,
            refetchOnMountOrArgChange: false
        })

    let content

    if (isLoading) {
        content = <Loader />
    }
    if (isError) {
        content = <Text className="pri-text">Error: {error?.data?.message || 'Failed to load services'}</Text>
    }
    if (isSuccess) {
        const { ids, entities } = services
        if (ids?.length) {

            content = (
                <Box mt={"100px"}>
                    <Box mb={10} textAlign="center">
                        <Text className="pri-text" mb={4}>
                            Our Services
                        </Text>
                        <Text className="sec-text" fontSize={{ base: "md", md: "lg" }} maxW="800px" mx="auto">
                            We provide a wide range of professional services tailored to meet your specific needs.
                            Explore our offerings below to discover how we can help you achieve your goals.
                        </Text>
                    </Box>

                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                        gap={8}>
                        {ids?.map(id => (
                            <ServiceCard key={id} serviceId={id} />
                        ))}
                    </Grid>
                </Box>
            )
        }
    } else {
        content = <Flex alignItems={"center"} justifyContent={"center"} h={"100vh"}>
            <Text className="pri-text">No services found.</Text>
        </Flex>
    }

    return (
        <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
            {content}
        </Box>
    )
}

export default ServicesList