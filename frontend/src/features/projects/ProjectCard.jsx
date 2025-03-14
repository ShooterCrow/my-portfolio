import { useSelector } from "react-redux"
import { selectProjectById, useDeleteProjectMutation, useGetProjectsQuery } from "@/features/projects/projectsApiSlice"
import {
    Box, Heading, Text, Divider, Stack,
    useColorModeValue, useBreakpointValue
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Button2 from "@/components/buttons/Button2"

const ProjectCard = ({ projectId }) => {
    const { project } = useGetProjectsQuery("projectsList", {
        selectFromResult: ({ data }) => ({
            project: data?.entities[projectId]
        }),
    })
    const [deleteProject, { isLoading }] = useDeleteProjectMutation()

    const cardBg = useColorModeValue("white", "gray.800")
    const borderColor = useColorModeValue("gray.200", "gray.600")
    const buttonSize = useBreakpointValue({ base: "sm", md: "md" })

    if (!project) return null

    const handleDelete = async () => {
        await deleteProject({ id: projectId })
    }

    return (
        <Box
            p={{ base: 3, md: 5 }}
            borderWidth="1px"
            borderRadius="md"
            bg={cardBg}
            borderColor={borderColor}
            transition="all 0.2s"
            _hover={{ shadow: "md", transform: "translateY(-2px)" }} >
            <Heading size="sm" className="pri-text" mb={2}>{project.title}</Heading>
            <Text noOfLines={2} mb={3} fontSize={{ base: "sm", md: "md" }}>{project.description}</Text>
            <Divider mb={3} />
            <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={{ base: 2, sm: 3 }}
                justifyContent="space-between" >
                <Button2 text="Delete" func={handleDelete} size={buttonSize} />
                <Link to={`/editproject/${project.id}`}>
                    <Button2 text="Edit Project" func={() => { }} size={buttonSize} />
                </Link>
            </Stack>
        </Box>
    )
}

export default ProjectCard