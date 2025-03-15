import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Loader from "@/components/otherComps/Loader";
import AddProjectForm from "./AddProjectForm";

const AddNewProject = () => {
  return (
    <>
      <Flex flexDir={"column"} mt={"100px"} mx={"50px"} >
        <AddProjectForm />
      </Flex>
    </>
  );
};

// Prevent unnecessary rerenders of the entire component
export default React.memo(AddNewProject);