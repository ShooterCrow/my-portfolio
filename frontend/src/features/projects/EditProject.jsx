import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import Loader from "@/components/otherComps/Loader";
import { useGetProjectsQuery, useUpdateProjectMutation } from "./projectsApiSlice";
import EditProjectForm from "./EditProjectForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProjectById } from "./projectsApiSlice";

const EditProject = () => {
  // Get project ID from URL parameters and fetch from Redux store
  const { id } = useParams();
  const { project, isSuccess, isLoading } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data, isSuccess, isLoading }) => ({
      project: data?.entities[id],
      isSuccess, 
      isLoading
    }),
  })

  return (
    <>
      <Flex flexDir={"column"} mt={"100px"} mx={"50px"} >
        {isLoading && <Loader />}
        <EditProjectForm project={project} isProjectSuccess={isSuccess} />
      </Flex>
    </>
  );
};

// Prevent unnecessary rerenders of the entire component
export default React.memo(EditProject);