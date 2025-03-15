import React, { useMemo } from 'react'
import { useGetProjectsQuery } from './projectsApiSlice';
import ProjectDisplay1 from '@/features/projects/ProjectDisplay1';
import Loader from '@/components/otherComps/Loader';
import { Box, Text, Center, Flex } from '@chakra-ui/react';

const ProjectsList = () => {
  const {
    data: projects,
    isLoading: isProjectLoading,
    isSuccess: isProjectSuccess,
    isError: isProjectError,
    error: projectError 
  } = useGetProjectsQuery("projectsList", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: false
  });

  const projectsList = useMemo(() => {
    if (!isProjectSuccess) return null;
    
    const { ids } = projects;
    return ids?.map(id => (
      <ProjectDisplay1 key={id} projectId={id} img={"/me.jpeg"} />
    ));
  }, [isProjectSuccess, projects]);

  let content;
  if (isProjectLoading) {
    content = (
      <Center h="200px">
        <Loader />
      </Center>
    );
  } else if (isProjectError) {
    content = (
      <Box mt={4} p={4} bg="red.50" borderRadius="md">
        <Text color="red.500">
          {projectError?.data?.message || 'Failed to load projects'}
        </Text>
      </Box>
    );
  } else if (isProjectSuccess && projectsList?.length === 0) {
    content = (
      <Box mt={4} p={4} bg="gray.50" borderRadius="md">
        <Text color="gray.500">No projects found</Text>
      </Box>
    );
  } else {
    content = projectsList;
  }

  return (
    <Box mt={"100px"}>
      {content}
    </Box>
  );
}

export default React.memo(ProjectsList);