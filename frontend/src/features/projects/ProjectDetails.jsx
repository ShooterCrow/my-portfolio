import { Box, Flex, Text, Button, Link, Divider } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectProjectById, useGetProjectsQuery } from './projectsApiSlice'
import { format } from 'date-fns'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ParallaxImage from '@/components/otherComps/ParallaxImage'
import Button1 from '@/components/buttons/Button1'
import Button2 from '@/components/buttons/Button2'

const ProjectDetails = () => {
  const { projectId } = useParams()
  const { isLoading, isSuccess, isError, error } = useGetProjectsQuery()
  const project = useSelector(state => selectProjectById(state, projectId))

  let content

  if (isLoading) {
    content = <Text className='pri-text'>Loading...</Text>
  } else if (isError) {
    content = <Text className='pri-text'>Error: {error?.data?.message || 'Failed to load project'}</Text>
  } else if (isSuccess && project) {
    const technologies = project.technologies.map((tech, index) => (
      <Text lineHeight={"12px"} color={"whiteAlpha.700"} key={index} className='sec-text' mr={2} mb={2}>
        [ {tech} ]
      </Text>
    ))

    const formattedDate = format(new Date(project.createdAt), "dd.MM.yyyy")

    content = (
      <Box mt={"100px"} maxW="1200px" mx="auto">
        <Box mx={"20px"} mb={8}>
          <Text className='pri-text' mb={4}>{project.title}</Text>
          <Flex justifyContent="space-between" alignItems="end" mb={6}>
            <Flex flexDir={"column"} flexWrap="wrap">
              {technologies}
            </Flex>
            <Text className='sec-text'>{formattedDate}</Text>
          </Flex>
        </Box>

        {/* Using our new ParallaxImage component */}
        <ParallaxImage
          imagePath={`/projectsImgs/${project.image}`}
          height="50vh"
          showOverlay={false}
          showContent={false} // No text overlay on the project details page
          blurAmount="5px"
        />

        <Box p={4}>
          <Flex direction="column" my={8}>
            <Box>
              <Text className='pri-text' fontSize="xl" mb={2}>Description</Text>
              <Text className='sec-text' mb={6}>{project.description}</Text>
            </Box>

            <Flex gap={4} mt={4}>
              <Link to>
              <Button2 text={"Live Site"} />
              </Link>
             
              {/* <Button
                as={Link}
                href={project.githubLink}
                isExternal
                leftIcon={<FaGithub />}
              > */}
              {/* </Button> */}

              {project.demoLink && (
                 <Link isExternal href='www.google.com'>
                 <Button1 text={"Github Repo"} />
                 {/* <FaExternalLinkAlt /> */}
                 </Link>
                // <Button
                //   as={Link}
                //   href={project.demoLink}
                //   isExternal
              )}
            </Flex>
          </Flex>

          <Divider my={8} />

          <Flex justifyContent="center" mb={8}>
            <Button colorScheme="blue" variant="ghost" onClick={() => window.history.back()}>
              Back to Projects
            </Button>
          </Flex>
        </Box>
      </Box>
    )
  } else {
    content = <Text className='pri-text'>No project found</Text>
  }

  return content
}

export default ProjectDetails