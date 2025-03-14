import React, { useMemo } from 'react'
import { selectAllProjects, useGetProjectsQuery } from './projectsApiSlice';
import { useSelector } from 'react-redux';
import ProjectDisplay1 from '@/features/projects/ProjectDisplay1';
import Loader from '@/components/otherComps/Loader';
import { Box, Text } from '@chakra-ui/react';

const ProjectsList = () => {
  const {
    data: projects,
    isLoading: isProjectLoading,
    isSuccess: isProjectSuccess,
    isError: isProjectError,
    error: projectError } = useGetProjectsQuery("projectsList", {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: false
    })

  const {ids, entities} = projects

  const projectsList = useMemo(() => {
    return ids?.map(id => (
      <ProjectDisplay1 key={id} projectId={id} img={"/me.jpeg"} />
    ));
    return null;
  }, [ids]);
  return (
    <Box mt={"100px"}>
      {projectsList}
    </Box>
  )
}

export default React.memo(ProjectsList)
