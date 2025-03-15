import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import Loader from "@/components/otherComps/Loader";
import { useUpdateProjectMutation } from "./projectsApiSlice";
import EditProjectForm from "./EditProjectForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProjectById } from "./projectsApiSlice";

const AddNewProject = () => {
  const [errorDisplay, setErrorDisplay] = useState(null);
  const formRef = useRef(null);
  
  // Get project ID from URL parameters and fetch from Redux store
  const { id } = useParams();
  const project = useSelector(state => selectProjectById(state, id));
  
  // RTK Query mutation for updating only
  const [updateProject, { isLoading, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateProjectMutation();

  const toast = useToast();
  
  // useEffect with proper dependency array
  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Project Updated!",
        description: "Your project has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (isUpdateError) {
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isUpdateSuccess, isUpdateError, toast]);

  // Submit handler for updating only
  const handleSubmit = useCallback(async (projectData) => {
    setErrorDisplay(null);

    try {
      await updateProject(projectData).unwrap();
    } catch (err) {
      setErrorDisplay("Something went wrong.");
    }
  }, [updateProject]);

  return (
    <>
    <Flex flexDir={"column"} mt={"100px"} mx={"50px"} >
      {isLoading && <Loader />}
      
      <EditProjectForm
        onSubmit={handleSubmit}
        errorDisplay={errorDisplay}
        isLoading={isLoading}
        formRef={formRef}
      />
    </Flex>
    </>
  );
};

// Prevent unnecessary rerenders of the entire component
export default React.memo(AddNewProject);