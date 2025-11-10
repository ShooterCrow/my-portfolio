import React, { useCallback, useEffect, useState } from "react";
import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex, 
  Text, 
  VStack, 
  HStack, 
  Box, 
  Image, 
  IconButton, 
  useToast,
  Checkbox,
  FormControl,
  FormLabel,
  SimpleGrid,
  Input
} from "@chakra-ui/react";
import { Input1, TextArea1 } from "@/components/forms/FormElements";
import Button1 from "@/components/buttons/Button1";
import { X, Upload, Plus } from "lucide-react";
import { useAddProjectMutation, useUpdateProjectMutation } from "../projects/projectsApiSlice";

const ProjectModal = ({ isOpen, onClose, project = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    demoLink: "",
    featured: false,
  });

  const [iconFile, setIconFile] = useState(null);
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [iconPreview, setIconPreview] = useState("");
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);
  const [existingIcon, setExistingIcon] = useState("");
  const [existingScreenshots, setExistingScreenshots] = useState([]);

  const [addProject, { 
    isLoading: isAddLoading, 
    isSuccess: isAddSuccess, 
    isError: isAddError, 
    error: addError 
  }] = useAddProjectMutation();

  const [updateProject, { 
    isLoading: isUpdateLoading, 
    isSuccess: isUpdateSuccess, 
    isError: isUpdateError, 
    error: updateError 
  }] = useUpdateProjectMutation();

  const isLoading = isAddLoading || isUpdateLoading;
  const isSuccess = isAddSuccess || isUpdateSuccess;
  const isError = isAddError || isUpdateError;
  const error = addError || updateError;

  const toast = useToast();

  // Initialize form with project data when in edit mode
  useEffect(() => {
    if (isEdit && project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies?.join(", ") || "",
        githubLink: project.githubLink || "",
        demoLink: project.demoLink || "",
        featured: project.featured || false,
      });
      
      if (project.icon?.url) {
        setExistingIcon(project.icon.url);
      }
      
      if (project.screenshots) {
        setExistingScreenshots(project.screenshots);
      }
    }
  }, [isEdit, project]);

  // Reset form when modal closes
  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      demoLink: "",
      featured: false,
    });
    setIconFile(null);
    setScreenshotFiles([]);
    setExistingIcon("");
    setExistingScreenshots([]);
    
    // Clean up preview URLs
    if (iconPreview) URL.revokeObjectURL(iconPreview);
    screenshotPreviews.forEach(preview => URL.revokeObjectURL(preview));
    
    setIconPreview("");
    setScreenshotPreviews([]);
  }, [iconPreview, screenshotPreviews]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: `Project ${isEdit ? "Updated" : "Added"}!`,
        description: `Your project has been ${isEdit ? "updated" : "added"} successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      resetForm();
      onClose();
    } else if (isError) {
      toast({
        title: "Error!",
        description: typeof error?.data?.message === "object" 
          ? "Something went wrong" 
          : error?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, isError, error, toast, onClose, resetForm, isEdit]);

  // Handle icon file selection
  const handleIconChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Icon must be less than 5MB",
          status: "error",
          duration: 3000,
        });
        return;
      }

      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a JPEG, PNG, or WebP image",
          status: "error",
          duration: 3000,
        });
        return;
      }

      if (iconPreview) {
        URL.revokeObjectURL(iconPreview);
      }

      setIconFile(file);
      const previewUrl = URL.createObjectURL(file);
      setIconPreview(previewUrl);
      setExistingIcon(""); // Clear existing icon when new one is uploaded
    }
  }, [toast, iconPreview]);

  // Handle screenshot files selection
  const handleScreenshotsChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    
    const totalScreenshots = screenshotFiles.length + existingScreenshots.length + files.length;
    if (totalScreenshots > 10) {
      toast({
        title: "Too many screenshots",
        description: `You can only upload up to 10 screenshots. You currently have ${screenshotFiles.length + existingScreenshots.length}.`,
        status: "error",
        duration: 3000,
      });
      e.target.value = '';
      return;
    }

    const validFiles = [];
    const validPreviews = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} must be less than 5MB`,
          status: "error",
          duration: 3000,
        });
        continue;
      }

      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} must be JPEG, PNG, or WebP`,
          status: "error",
          duration: 3000,
        });
        continue;
      }

      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    }

    if (validFiles.length > 0) {
      setScreenshotFiles(prev => [...prev, ...validFiles]);
      setScreenshotPreviews(prev => [...prev, ...validPreviews]);
    }

    e.target.value = '';
  }, [screenshotFiles, existingScreenshots, toast]);

  // Remove screenshot
  const removeScreenshot = useCallback((index, isExisting = false) => {
    if (isExisting) {
      setExistingScreenshots(prev => prev.filter((_, i) => i !== index));
    } else {
      URL.revokeObjectURL(screenshotPreviews[index]);
      setScreenshotFiles(prev => prev.filter((_, i) => i !== index));
      setScreenshotPreviews(prev => prev.filter((_, i) => i !== index));
    }
  }, [screenshotPreviews]);

  // Remove icon
  const removeIcon = useCallback(() => {
    if (iconPreview) {
      URL.revokeObjectURL(iconPreview);
    }
    setIconFile(null);
    setIconPreview("");
    setExistingIcon("");
  }, [iconPreview]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (iconPreview) URL.revokeObjectURL(iconPreview);
      screenshotPreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [iconPreview, screenshotPreviews]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.technologies) {
      toast({
        title: "Missing required fields",
        description: "Title and technologies are required",
        status: "error",
        duration: 3000,
      });
      return;
    }

    if (!isEdit && !iconFile) {
      toast({
        title: "Icon required",
        description: "Please upload a project icon",
        status: "error",
        duration: 3000,
      });
      return;
    }

    const techArray = formData.technologies
      .split(",")
      .map(tech => tech.trim())
      .filter(tech => tech);

    const projectData = {
      title: formData.title,
      description: formData.description,
      technologies: techArray,
      githubLink: formData.githubLink,
      demoLink: formData.demoLink,
      featured: formData.featured,
    };

    // Only include files if they are provided
    if (iconFile) {
      projectData.icon = iconFile;
    }

    if (screenshotFiles.length > 0) {
      projectData.screenshots = screenshotFiles;
    }

    // For edit mode, include the project ID and existing media info
    if (isEdit && project) {
      projectData.id = project._id || project.id;
      projectData.existingIcon = existingIcon;
      projectData.existingScreenshots = existingScreenshots;
    }

    try {
      if (isEdit) {
        await updateProject(projectData).unwrap();
      } else {
        await addProject(projectData).unwrap();
      }
    } catch (error) {
      console.error(`Failed to ${isEdit ? 'update' : 'add'} project:`, error);
    }
  }, [formData, iconFile, screenshotFiles, isEdit, project, existingIcon, existingScreenshots, addProject, updateProject, toast]);

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  const modalTitle = isEdit ? "Edit Project" : "Add New Project";
  const submitButtonText = isLoading 
    ? `${isEdit ? "Updating" : "Creating"} Project...` 
    : `${isEdit ? "Update" : "Create"} Project`;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      size="4xl" 
      scrollBehavior="inside"
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
      <ModalContent 
        bg="#1a1a1a" 
        border="1px solid" 
        borderColor="gray.700"
        maxH="90vh"
      >
        <ModalHeader 
          borderBottom="1px solid" 
          borderColor="gray.700"
          color="white"
          fontSize="2xl"
          fontWeight="bold"
        >
          <HStack spacing="3">
            <Box w="3px" h="6" bg="linear-gradient(180deg, #ff4b20 0%, #ff6b3d 100%)" />
            <Text>{modalTitle}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton 
          color="gray.400" 
          _hover={{ color: "#ff4b20", bg: "rgba(255, 75, 32, 0.1)" }}
          isDisabled={isLoading}
        />
        
        <ModalBody py="6">
          <form onSubmit={handleSubmit}>
            <VStack spacing="6" align="stretch">
              {/* Title Field */}
              <Input1
                type="text"
                label="Project Title"
                name="title"
                value={formData.title}
                func={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project title"
                required
              />

              {/* Description Field */}
              <TextArea1
                value={formData.description}
                label="Description"
                name="description"
                func={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter project description"
                rows={4}
              />

              {/* Technologies Field */}
              <Input1
                type="text"
                label="Technologies"
                name="technologies"
                value={formData.technologies}
                func={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Node.js, MongoDB, etc. (comma separated)"
                required
              />

              {/* Project Links */}
              <HStack spacing="4" align="start">
                <Input1
                  type="url"
                  label="GitHub Link"
                  name="githubLink"
                  value={formData.githubLink}
                  func={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  placeholder="https://github.com/yourusername/project"
                  flex="1"
                />
                <Input1
                  type="url"
                  label="Demo Link"
                  name="demoLink"
                  value={formData.demoLink}
                  func={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                  placeholder="https://your-project-demo.com"
                  flex="1"
                />
              </HStack>

              {/* Featured Checkbox */}
              <FormControl>
                <HStack>
                  <Checkbox
                    isChecked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    colorScheme="orange"
                    size="lg"
                  />
                  <FormLabel className="sec-text" color="gray.300" mb="0">
                    Feature this project
                  </FormLabel>
                </HStack>
              </FormControl>

              {/* Icon Upload */}
              <Box>
                <Text className="sec-text" color="gray.300" mb="2" fontSize="sm">
                  Project Icon {!isEdit && <Text as="span" color="red.400">*</Text>}
                </Text>
                {iconPreview || existingIcon ? (
                  <Box position="relative" w="140px" h="140px">
                    <Image
                      src={iconPreview || existingIcon}
                      alt="Icon preview"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      borderRadius="md"
                      border="2px solid"
                      borderColor="gray.600"
                    />
                    <IconButton
                      icon={<X size={16} />}
                      position="absolute"
                      top="2"
                      right="2"
                      size="sm"
                      bg="red.500"
                      color="white"
                      _hover={{ bg: "red.600" }}
                      onClick={removeIcon}
                      aria-label="Remove icon"
                      borderRadius="md"
                    />
                  </Box>
                ) : (
                  <Box
                    as="label"
                    display="flex"
                    w="140px"
                    h="140px"
                    border="2px dashed"
                    borderColor="gray.600"
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ borderColor: "#ff4b20", bg: "whiteAlpha.50" }}
                    transition="all 0.2s"
                  >
                    <Input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleIconChange}
                      display="none"
                    />
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      w="100%"
                      h="100%"
                      color="gray.500"
                      _hover={{ color: "#ff4b20" }}
                    >
                      <Upload size={28} />
                      <Text fontSize="xs" mt="2" fontWeight="medium">
                        {isEdit ? "Change Icon" : "Upload Icon"}
                      </Text>
                      <Text fontSize="xs" color="gray.600" mt="1">Max 5MB</Text>
                    </Flex>
                  </Box>
                )}
              </Box>

              {/* Screenshots Upload */}
              <Box>
                <HStack justify="space-between" mb="2">
                  <Text className="sec-text" color="gray.300" fontSize="sm">
                    Screenshots <Text as="span" color="gray.500">(Optional)</Text>
                  </Text>
                  <Text fontSize="sm" color={(screenshotFiles.length + existingScreenshots.length) >= 10 ? "red.400" : "gray.500"}>
                    {screenshotFiles.length + existingScreenshots.length} / 10
                  </Text>
                </HStack>
                
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing="4">
                  {/* Existing Screenshots */}
                  {existingScreenshots.map((screenshot, index) => (
                    <Box key={`existing-${index}`} position="relative" w="100%" paddingTop="75%">
                      <Image
                        src={screenshot.url || screenshot}
                        alt={`Existing screenshot ${index + 1}`}
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="md"
                        border="2px solid"
                        borderColor="gray.600"
                      />
                      <IconButton
                        icon={<X size={14} />}
                        position="absolute"
                        top="2"
                        right="2"
                        size="xs"
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        onClick={() => removeScreenshot(index, true)}
                        aria-label={`Remove existing screenshot ${index + 1}`}
                        borderRadius="md"
                      />
                    </Box>
                  ))}

                  {/* New Screenshot Previews */}
                  {screenshotPreviews.map((preview, index) => (
                    <Box key={`new-${index}`} position="relative" w="100%" paddingTop="75%">
                      <Image
                        src={preview}
                        alt={`New screenshot ${index + 1}`}
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="md"
                        border="2px solid"
                        borderColor="gray.600"
                      />
                      <IconButton
                        icon={<X size={14} />}
                        position="absolute"
                        top="2"
                        right="2"
                        size="xs"
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        onClick={() => removeScreenshot(index, false)}
                        aria-label={`Remove new screenshot ${index + 1}`}
                        borderRadius="md"
                      />
                    </Box>
                  ))}

                  {(screenshotFiles.length + existingScreenshots.length) < 10 && (
                    <Box
                      as="label"
                      display="flex"
                      w="100%"
                      paddingTop="75%"
                      position="relative"
                      border="2px dashed"
                      borderColor="gray.600"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ borderColor: "#ff4b20", bg: "whiteAlpha.50" }}
                      transition="all 0.2s"
                    >
                      <Input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleScreenshotsChange}
                        multiple
                        display="none"
                      />
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        color="gray.500"
                        _hover={{ color: "#ff4b20" }}
                      >
                        <Plus size={24} />
                        <Text fontSize="xs" mt="2" fontWeight="medium">
                          {isEdit ? "Add More" : "Add Photos"}
                        </Text>
                      </Flex>
                    </Box>
                  )}
                </SimpleGrid>
              </Box>

              {/* Submit Button */}
              <HStack spacing="3" pt="4">
                <Button1 
                  text={submitButtonText} 
                  func={handleSubmit}
                  isLoading={isLoading}
                />
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default React.memo(ProjectModal);