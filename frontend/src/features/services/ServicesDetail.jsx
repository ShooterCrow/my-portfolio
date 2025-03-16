import { Box, Flex, Text, Button, Divider, List, ListItem, ListIcon, Heading } from '@chakra-ui/react'
import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ParallaxImage from '@/components/otherComps/ParallaxImage'
import { CheckCircleIcon } from 'lucide-react'
import Loader from '@/components/otherComps/Loader'
import { useGetServicesQuery } from './ServicesApiSlice'
import Button2 from '@/components/buttons/Button2'
import Button1 from '@/components/buttons/Button1'

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
      <Box maxW="1200px" mx="auto">
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
                {alert(service.pricing)}
              </Box>
            )}

            {/* CTA section */}
            <Box textAlign="center" my={10}>
              <Button2 link='/contact' text={"Get a Quote"}>
                Get a Quote
              </Button2>
            </Box>
          </Flex>

          <Divider my={8} />

          {/* Related services if available */}
          {service.relatedServices?.length > 0 && (
            <Box mb={8}>
              <Text className="sec-text" fontSize="xl" mb={4}>[ Related Services ]</Text>
              <Flex gap={4} flexWrap="wrap">
                {service.relatedServices.map(relatedId => (
                  <Button1 key={relatedId} text={"View Related Service"} link={`/services/${relatedId}`} />
                ))}
              </Flex>
            </Box>
          )}

          {/* Back button */}
          <Flex justifyContent="center" mb={8}>
            <Link to={'/services'}>
              <Text className='sec-text'>Back to Services</Text>
            </Link>
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