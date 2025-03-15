import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Input1, TextArea1 } from "@/components/forms/FormElements";
import Button1 from "@/components/buttons/Button1";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProjectById, useGetProjectsQuery } from "./projectsApiSlice";

const AddNewProject = ({ errorDisplay = null }) => {
  // Get project ID from URL parameters and fetch from Redux store
  const { id } = useParams();
  const { project, isSuccess } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data, isSuccess }) => ({
      project: data?.entities[id],
      isSuccess
    }),
  })
  
  // Use a single state object to minimize state updates
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    demoLink: "",
    image: "",
  });

  // Update formData only when isSuccess is true and project is available
  useEffect(() => {
    if (isSuccess && project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies?.join(", ") || "",
        githubLink: project.githubLink || "",
        demoLink: project.demoLink || "",
        image: project.image || "",
      });
    }
  }, [isSuccess, project]);

  // Memoize the submit handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Convert comma-separated technologies to array
    const techArray = formData.technologies.split(",").map(tech => tech.trim()).filter(tech => tech);

    const projectData = {
      title: formData.title,
      description: formData.description,
      technologies: techArray,
      githubLink: formData.githubLink,
      demoLink: formData.demoLink,
      image: formData.image
    };

  })
  

  return (
    <form>
      <Flex direction="column" gap={4}>
        {/* Title Field */}
          <Input1
            type="text"
            label="Project Title"
            name="Project Title"
            value={formData.title}
            func={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Enter project title"
            required
          />

        {/* Description Field */}
          <TextArea1
            value={formData.description}
            label="Description"
            name="Description"
            func={(e) => setFormData({...formData, })}
            placeholder="Enter project description"
            rows={4}
          />

        {/* Technologies Field */}
          <Input1
            type="text"
            label="Technologies"
            name="Technologies"
            value={formData.technologies}
            func={(e) => setFormData({...formData, })}
            placeholder="React, Node.js, MongoDB, etc. (comma separated)"
            required
          />

        {/* Github Link Field */}
          <Input1
            type="url"
            label="GitHub Link"
            name="GitHub Link"
            value={formData?.githubLink}
            func={(e) => setFormData({...formData, })}
            placeholder="https://github.com/yourusername/project"
            required
          />

        {/* Demo Link Field */}
          <Input1
            type="url"
            label="Demo Link"
            name="Demo Link"
            value={formData.demoLink}
            func={(e) => setFormData({...formData, demoLink: e.target.value})}
            placeholder="https://your-project-demo.com"
          />

        {/* Image URL Field */}
          <Input1
            type="url"
            label="Image URL"
            name="Image URL"
            value={formData.image}
            func={(e) => setFormData({...formData, })}
            placeholder="https://example.com/image.jpg"
            required
          />

        {/* Error Display */}
        {/* <ErrorMessage message={errorDisplay} /> */}

        < Button1 text={ "Update Project" } func={handleSubmit} />
      </Flex>
    </form>
  );

};

// Prevent unnecessary rerenders of the entire form
export default React.memo(AddNewProject);