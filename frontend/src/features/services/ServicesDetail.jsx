import { Box, Flex, Text, Button, Divider, List, ListItem, ListIcon, Heading } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectServiceById, useGetServicesQuery } from './servicesApiSlice'
import ParallaxImage from '@/components/otherComps/ParallaxImage'
import { CheckCircleIcon } from 'lucide-react'
import Loader from '@/components/otherComps/Loader'

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const { service, isLoading, isError, isSuccess } = useGetServicesQuery("servicesList", {
    selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
      service: data?.entities[serviceId],
      isLoading, 
      isError, 
      isSuccess
    }),
  })

  let content

  if (isLoading) {
    content = <Loader />
  } else if (isError) {
    content = <Text className='pri-text'>Error: {error?.data?.message || 'Failed to load service'}</Text>
  } else if (isSuccess && service) {
    content = (
      <Box mt={{ base: "80px", lg: "120px" }} maxW="1200px" mx="auto">
        {/* Title Section */}
        <Box mb={6} textAlign="center">
          <Text as="h1" className="pri-text" mb={4}>
            {service.title}
          </Text>
          <Text className="sec-text" fontSize="lg" maxW="800px" mx="auto">
            {service.shortDescription}
          </Text>
        </Box>

        {/* Parallax Image - Positioned below the title */}
        <ParallaxImage
          imagePath={`/servicesImgs/${service.image}`}
          height="60vh"
          showOverlay={true}
          showContent={false}
          blurAmount="5px"
        />

        <Box p={4} mt={10}>
          {/* Main content */}
          <Flex direction="column">
            <Box mb={8}>
              <Text className="pri-text" fontSize="2xl" mb={4}>About This Service</Text>
              <Text className="sec-text" whiteSpace="pre-line">
                {service.description}
              </Text>
            </Box>

            {/* Key features/benefits */}
            {service.keyFeatures?.length > 0 && (
              <Box mb={8}>
                <Text className="pri-text" fontSize="xl" mb={4}>Key Features</Text>
                <List spacing={3}>
                  {service.keyFeatures.map((feature, index) => (
                    <ListItem key={index} display="flex" alignItems="flex-start">
                      <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                      <Text className="sec-text">{feature}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Pricing section if available */}
            {service.pricing && (
              <Box mb={8}>
                <Text className="pri-text" fontSize="xl" mb={4}>Pricing</Text>
                <Text className="sec-text">{service.pricing}</Text>
              </Box>
            )}

            {/* CTA section */}
            <Box textAlign="center" my={10}>
              <Button size="lg" colorScheme="blue" onClick={() => navigate('/contact')}>
                Get a Quote
              </Button>
            </Box>
          </Flex>

          <Divider my={8} />

          {/* Related services if available */}
          {service.relatedServices?.length > 0 && (
            <Box mb={8}>
              <Text className="pri-text" fontSize="xl" mb={4}>Related Services</Text>
              <Flex gap={4} flexWrap="wrap">
                {service.relatedServices.map(relatedId => (
                  <Button
                    key={relatedId}
                    variant="outline"
                    onClick={() => navigate(`/services/${relatedId}`)} >
                    {/* Ideally you would look up the title here */}
                    View Related Service
                  </Button>
                ))}
              </Flex>
            </Box>
          )}

          {/* Back button */}
          <Flex justifyContent="center" mb={8}>
            <Button colorScheme="blue" variant="ghost" onClick={() => navigate('/services')}>
              Back to Services
            </Button>
          </Flex>
        </Box>
      </Box>
    )
  } else {
    content = <Text className='pri-text'>No service found</Text>
  }

  return content
}

export default ServiceDetail