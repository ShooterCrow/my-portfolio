import React, { useCallback, useEffect, useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import { Input1, TextArea1 } from "@/components/forms/FormElements";
import Button1 from "@/components/buttons/Button1";
import { useUpdateProjectMutation } from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";

const EditProjectForm = ({ project, isProjectSuccess }) => {
  const navigate = useNavigate()
  // Use multiple useState hooks for each form field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [image, setImage] = useState("");

  // Update form fields only when isSuccess is true and project is available
  useEffect(() => {
    if (isProjectSuccess && project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTechnologies(project.technologies?.join(", ") || "");
      setGithubLink(project.githubLink || "");
      setDemoLink(project.demoLink || "");
      setImage(project.image || "");
    }
  }, [isProjectSuccess, project]);

  const [updateProject, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateProjectMutation();
  const toast = useToast();

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Project Updated!",
        description: "Your project has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(-1)
    } else if (isUpdateError) {
      toast({
        title: "Error!",
        description: typeof updateError?.data?.message === "object" ? "Something went wrong" : updateError?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isUpdateSuccess, isUpdateError, toast]);

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // Convert comma-separated technologies to array
      const techArray = technologies.split(",").map((tech) => tech.trim()).filter((tech) => tech);
      const projectData = {
        id: project.id,
        title,
        description,
        technologies: techArray,
        githubLink,
        demoLink,
        image,
      };
      await updateProject(projectData);
      
    },
    [title, description, technologies, githubLink, demoLink, image, project, updateProject]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={4}>
        {/* Title Field */}
        <Input1
          type="text"
          label="Project Title"
          name="Project Title"
          value={title}
          func={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          required
        />

        {/* Description Field */}
        <TextArea1
          value={description}
          label="Description"
          name="Description"
          func={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          rows={4}
        />

        {/* Technologies Field */}
        <Input1
          type="text"
          label="Technologies"
          name="Technologies"
          value={technologies}
          func={(e) => setTechnologies(e.target.value)}
          placeholder="React, Node.js, MongoDB, etc. (comma separated)"
          required
        />

        {/* Github Link Field */}
        <Input1
          type="url"
          label="GitHub Link"
          name="GitHub Link"
          value={githubLink}
          func={(e) => setGithubLink(e.target.value)}
          placeholder="https://github.com/yourusername/project"
          required
        />

        {/* Demo Link Field */}
        <Input1
          type="url"
          label="Demo Link"
          name="Demo Link"
          value={demoLink}
          func={(e) => setDemoLink(e.target.value)}
          placeholder="https://your-project-demo.com"
        />

        {/* Image URL Field */}
        <Input1
          type="text"
          label="Image URL"
          name="Image URL"
          value={image}
          func={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          required
        />

        <Button1 text={"Update Project"} />
      </Flex>
    </form>
  );
};

// Prevent unnecessary rerenders of the entire form
export default React.memo(EditProjectForm);