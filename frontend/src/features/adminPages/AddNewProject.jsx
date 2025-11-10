import React, { useCallback, useEffect, useState } from "react";
import { 
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
import { useAddProjectMutation } from "../projects/projectsApiSlice";

const AddNewProject = () => {
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

  const [addProject, { 
    isLoading: isAddLoading, 
    isSuccess: isAddSuccess, 
    isError: isAddError, 
    error: addError 
  }] = useAddProjectMutation();

  const toast = useToast();

  useEffect(() => {
    if (isAddSuccess) {
      toast({
        title: "Project Added!",
        description: "Your project has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Reset form
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
      setIconPreview("");
      setScreenshotPreviews([]);
    } else if (isAddError) {
      toast({
        title: "Error!",
        description: typeof addError?.data?.message === "object" 
          ? "Something went wrong" 
          : addError?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isAddSuccess, isAddError, addError]);

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

      // Clean up old preview
      if (iconPreview) {
        URL.revokeObjectURL(iconPreview);
      }

      setIconFile(file);
      const previewUrl = URL.createObjectURL(file);
      setIconPreview(previewUrl);
    }
  }, [toast, iconPreview]);

  // Handle screenshot files selection
  const handleScreenshotsChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    
    // Check if adding these files would exceed the limit
    if (screenshotFiles.length + files.length > 10) {
      toast({
        title: "Too many screenshots",
        description: `You can only upload up to 10 screenshots. You currently have ${screenshotFiles.length}.`,
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

    // Reset file input
    e.target.value = '';
  }, [screenshotFiles, toast]);

  // Remove screenshot
  const removeScreenshot = useCallback((index) => {
    // Clean up the object URL
    URL.revokeObjectURL(screenshotPreviews[index]);
    
    setScreenshotFiles(prev => prev.filter((_, i) => i !== index));
    setScreenshotPreviews(prev => prev.filter((_, i) => i !== index));
  }, [screenshotPreviews]);

  // Remove icon
  const removeIcon = useCallback(() => {
    if (iconPreview) {
      URL.revokeObjectURL(iconPreview);
    }
    setIconFile(null);
    setIconPreview("");
  }, [iconPreview]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (iconPreview) URL.revokeObjectURL(iconPreview);
      screenshotPreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, []);

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

    if (!iconFile) {
      toast({
        title: "Icon required",
        description: "Please upload a project icon",
        status: "error",
        duration: 3000,
      });
      return;
    }

    // Convert comma-separated technologies to array
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
      icon: iconFile,
      screenshots: screenshotFiles,
    };

    try {
      await addProject(projectData).unwrap();
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  }, [formData, iconFile, screenshotFiles, addProject, toast]);

  return (
    <Box bg="#131313" p="6" borderRadius="sm" border="1px solid" borderColor="gray.700">
      <Text className="sec-text" color="gray.400" fontSize="lg" mb="6">
        [ ADD NEW PROJECT ]
      </Text>

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
              Project Icon <Text as="span" color="red.400">*</Text>
            </Text>
            {iconPreview ? (
              <Box position="relative" w="140px" h="140px">
                <Image
                  src={iconPreview}
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
                  <Text fontSize="xs" mt="2" fontWeight="medium">Upload Icon</Text>
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
              <Text fontSize="sm" color={screenshotFiles.length >= 10 ? "red.400" : "gray.500"}>
                {screenshotFiles.length} / 10
              </Text>
            </HStack>
            
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="4">
              {/* Existing previews */}
              {screenshotPreviews.map((preview, index) => (
                <Box key={index} position="relative" w="100%" paddingTop="75%">
                  <Image
                    src={preview}
                    alt={`Screenshot ${index + 1}`}
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
                    onClick={() => removeScreenshot(index)}
                    aria-label={`Remove screenshot ${index + 1}`}
                    borderRadius="md"
                  />
                </Box>
              ))}

              {/* Add more button */}
              {screenshotFiles.length < 10 && (
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
                    <Text fontSize="xs" mt="2" fontWeight="medium">Add Photos</Text>
                  </Flex>
                </Box>
              )}
            </SimpleGrid>
            
            {screenshotFiles.length === 0 && (
              <Text fontSize="xs" color="gray.600" mt="2">
                You can upload up to 10 screenshots (JPEG, PNG, or WebP, max 5MB each)
              </Text>
            )}
          </Box>

          {/* Submit Button */}
          <Button1 
            text={isAddLoading ? "Creating Project..." : "Create Project"} 
            func={handleSubmit}
            isLoading={isAddLoading}
          />
        </VStack>
      </form>
    </Box>
  );
};

export default React.memo(AddNewProject);