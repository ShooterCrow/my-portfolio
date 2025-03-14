import { useGetProjectsQuery } from "@/features/projects/projectsApiSlice"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
import ProjectCard from "./ProjectCard"
import React from "react"

const ProjectListDash = () => {
       const { projects, isSuccess } = useGetProjectsQuery("projectsList", {
        selectFromResult: ({ data, isSuccess }) => ({
            projects: data,
            isSuccess
        }),
    })

    // Responsive adjustments
    const gridColumns = useBreakpointValue({
        base: "1fr",
        sm: "repeat(auto-fill, minmax(250px, 1fr))",
        md: "repeat(auto-fill, minmax(300px, 1fr))"
    })
    let content
    if (isSuccess) {
        const { ids } = projects
        content = <Grid templateColumns={gridColumns} gap={{ base: 4, md: 6 }}>
            {ids?.map(id => (
                <ProjectCard
                    key={id}
                    projectId={id}
                />
            ))}
        </Grid>
    }

    return content
}

export default React.memo(ProjectListDash)