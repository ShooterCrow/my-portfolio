import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { Input1, TextArea1 } from "@/components/forms/FormElements";
import Button1 from "@/components/buttons/Button1";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAddProjectMutation } from "./projectsApiSlice";

const AddNewProject = () => {
    // Use a single state object to minimize state updates
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        demoLink: "",
        image: "",
    });

    const [addProject, { isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError, error: addError }] = useAddProjectMutation();
    const toast = useToast();

    useEffect(() => {
        if (isAddSuccess) {
            toast({
                title: "Project Add!",
                description: "Your project has been addd successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else if (isAddLoading) {
            toast({
                title: "Loading...",
                description: "Creating new project...",
                status: "loading",
                duration: 5000,
                isClosable: false,
            });
        } else if (isAddError) {
            toast({
                title: "Error!",
                description: typeof addError?.data?.message === "object" ? "Something went wrong" : addError?.data?.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [isAddSuccess, isAddError, toast]);


    // Memoize the submit handler
    const handleSubmit = useCallback(async (e) => {
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
        await addProject(projectData);
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
                    func={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter project title"
                    required />

                {/* Description Field */}
                <TextArea1
                    value={formData.description}
                    label="Description"
                    name="Description"
                    func={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter project description"
                    rows={4} />

                {/* Technologies Field */}
                <Input1
                    type="text"
                    label="Technologies"
                    name="Technologies"
                    value={formData.technologies}
                    func={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Node.js, MongoDB, etc. (comma separated)"
                    required />

                {/* Github Link Field */}
                <Input1
                    type="url"
                    label="GitHub Link"
                    name="GitHub Link"
                    value={formData?.githubLink}
                    func={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                    placeholder="https://github.com/yourusername/project"
                    required
                />

                {/* Demo Link Field */}
                <Input1
                    type="url"
                    label="Demo Link"
                    name="Demo Link"
                    value={formData.demoLink}
                    func={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                    placeholder="https://your-project-demo.com"
                />

                {/* Image URL Field */}
                <Input1
                    type="text"
                    label="Image URL"
                    name="Image URL"
                    value={formData.image}
                    func={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                />

                {/* Error Display */}
                {/* <ErrorMessage message={errorDisplay} /> */}

                < Button1 text={"Add Project"} func={handleSubmit} />
            </Flex>
        </form>
    );

};

// Prevent unnecessary rerenders of the entire form
export default React.memo(AddNewProject);