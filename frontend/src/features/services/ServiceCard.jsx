import { Box, Text, useColorModeValue, Heading } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { useGetServicesQuery } from "./ServicesApiSlice"


export const ServiceCard = ({ serviceId }) => {

    const { service } = useGetServicesQuery("servicesList", {
        selectFromResult: ({ data }) => ({
            service: data?.entities[serviceId]
        }),
    })

    const bgColor = useColorModeValue('white.50', 'whiteAlpha.100')
    const hoverBgColor = useColorModeValue('white.50', 'whiteAlpha.200')

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }} >
            <Link to={`/services/${service.id}`}>
                <Box
                    borderRadius="md"
                    overflow="hidden"
                    bg={bgColor}
                    _hover={{ bg: hoverBgColor }}
                    boxShadow="md"
                    h="100%" >
                    <Box
                        h="200px"
                        position="relative">
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            bgImage={`url(/servicesImgs/${service.image})`}
                            bgSize="cover"
                            bgPosition="center" />
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            bg="rgba(0, 0, 0, 0.6)" // Dark overlay with 40% opacity
                            zIndex="1" />
                    </Box>
                    <Box p={5}>
                        <Text className="sec-text" fontSize="xl" fontWeight={"bold"} mb={2}>[{service.title}]</Text>
                        <Text className="sec-text" noOfLines={3}>{service.shortDescription}</Text>
                    </Box>
                </Box>
            </Link>
        </motion.div>
    )
}
