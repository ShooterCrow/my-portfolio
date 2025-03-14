import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import Loader from "@/components/otherComps/Loader";
import { useAddProjectMutation, useUpdateProjectMutation } from "./projectsApiSlice";
import EditProjectForm from "./EditProjectForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProjectById } from "./projectsApiSlice";

const EditProject = () => {
  const [errorDisplay, setErrorDisplay] = useState(null);
  const formRef = useRef(null);
  
  // Get project ID from URL parameters and fetch from Redux store
  const { id } = useParams();
  const project = useSelector(state => selectProjectById(state, id));
  
  // RTK Query mutations
  const [addProject, { isLoading: isCreating, isSuccess: isCreateSuccess, isError: isCreateError }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateProjectMutation();

  // Memoize the loading state
  const isLoading = useMemo(() => isCreating || isUpdating, [isCreating, isUpdating]);
  
  const toast = useToast();
  
  // useEffect with proper dependency array
  useEffect(() => {
    const isSuccess = isCreateSuccess || isUpdateSuccess;
    const isError = isCreateError || isUpdateError;
    
    if (isSuccess) {
      toast({
        title: project ? "Project Updated!" : "Project Created!",
        description: project 
          ? "Your project has been updated successfully." 
          : "Your project has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Only reset form on create, not on update
      if (!project && formRef.current) {
        formRef.current.resetForm();
      }
    } else if (isError) {
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isCreateSuccess, isUpdateSuccess, isCreateError, isUpdateError, toast, project]);

  // Memoize the submit handler
  const handleSubmit = useCallback(async (projectData) => {
    setErrorDisplay(null);

    try {
      if (id) {
        // Update existing project
        await updateProject(projectData).unwrap();
      } else {
        // Create new project
        await addProject(projectData).unwrap();
      }
    } catch (err) {
      setErrorDisplay("Something went wrong.");
    }
  }, [id, addProject, updateProject]);

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
export default React.memo(EditProject);