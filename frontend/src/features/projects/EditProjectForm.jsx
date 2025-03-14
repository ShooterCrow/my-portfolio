import React, { useCallback, useMemo, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Input1, TextArea1 } from "@/components/forms/FormElements";
import Button1 from "@/components/buttons/Button1";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProjectById } from "./projectsApiSlice";

// Separate form field component to prevent unnecessary rerenders
const FormField = React.memo(({ label, required = false, children }) => {
  return (
    <Flex direction="column">
      <Text mb={2}>{label} {required && "*"}</Text>
      {children}
    </Flex>
  );
});

// Error message component
const ErrorMessage = React.memo(({ message }) => {
  if (!message) return null;
  return <Text color="red.500" mt={2}>{message}</Text>;
});

// Submit button component
const SubmitButton = React.memo(({ isLoading, isUpdate }) => {
  return (
    <Button1 text={isUpdate ? "Update Project" : "Add Project"} type="submit" disabled={isLoading} />
  );
});

const EditProjectForm = ({ 
  onSubmit,
  errorDisplay = null,
  isLoading = false,
  formRef
}) => {
  // Get project ID from URL parameters and fetch from Redux store
  const { id } = useParams();
  const project = useSelector(state => selectProjectById(state, id));
  
  // Determine if we're in update mode
  const isUpdate = !!project;
  
  // Use a single state object to minimize state updates
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    technologies: project?.technologies?.join(", ") || "",
    githubLink: project?.githubLink || "",
    demoLink: project?.demoLink || "",
    image: project?.image || ""
  });
  
  // Field change handler using useCallback to prevent recreation on each render
  const handleFieldChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }

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

    // If we have an ID, include it for updates
    if (id) {
      projectData.id = id;
    }

    onSubmit(projectData);
  }, [formData, onSubmit, id]);

  // Method to reset form data - can be called from parent
  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      demoLink: "",
      image: ""
    });
  }, []);

  // Expose form data and reset method to parent component
  React.useImperativeHandle(
    formRef,
    () => ({
      getFormData: () => formData,
      resetForm
    }),
    [formData, resetForm]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={4}>
        {/* Title Field */}
        <FormField label="Project Title" required>
          <Input1
            type="text"
            value={formData.title}
            func={handleFieldChange('title')}
            placeholder="Enter project title"
            required
          />
        </FormField>
        
        {/* Description Field */}
        <FormField label="Description">
          <TextArea1
            value={formData.description}
            func={handleFieldChange('description')}
            placeholder="Enter project description"
            rows={4}
          />
        </FormField>
        
        {/* Technologies Field */}
        <FormField label="Technologies" required>
          <Input1
            type="text"
            value={formData.technologies}
            func={handleFieldChange('technologies')}
            placeholder="React, Node.js, MongoDB, etc. (comma separated)"
            required
          />
        </FormField>
        
        {/* Github Link Field */}
        <FormField label="GitHub Link" required>
          <Input1
            type="url"
            value={formData?.githubLink}
            func={handleFieldChange('githubLink')}
            placeholder="https://github.com/yourusername/project"
            required
          />
        </FormField>
        
        {/* Demo Link Field */}
        <FormField label="Demo Link">
          <Input1
            type="url"
            value={formData.demoLink}
            func={handleFieldChange('demoLink')}
            placeholder="https://your-project-demo.com"
          />
        </FormField>
        
        {/* Image URL Field */}
        <FormField label="Image URL" required>
          <Input1
            type="url"
            value={formData.image}
            func={handleFieldChange('image')}
            placeholder="https://example.com/image.jpg"
            required
          />
        </FormField>
        
        {/* Error Display */}
        <ErrorMessage message={errorDisplay} />
        
        {/* Submit Button */}
        <SubmitButton isLoading={isLoading} isUpdate={isUpdate} />
      </Flex>
    </form>
  );
};

// Prevent unnecessary rerenders of the entire form
export default React.memo(EditProjectForm);