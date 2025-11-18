import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Image,
  Badge,
  SimpleGrid,
  Input,
  Select,
  Button,
  IconButton,
  Heading,
  useDisclosure
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ExternalLink, ArrowRight, Edit, Github, Trash2, LoaderPinwheel } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAllProjects, useDeleteProjectMutation, useGetGithubProjectsAndUpdateMutation, useGetProjectsQuery } from "../projects/projectsApiSlice";
import Loader from "@/components/otherComps/Loader";
import ProjectModal from "./ProjectModal";
import Button2 from "@/components/buttons/Button2";

const MotionBox = motion.create(Box);

const ProjectCard = React.memo(({ project, onEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteProject, { isSuccess: isDeleteProjectSuccess, isLoading: isDeleteProjectLoading }] = useDeleteProjectMutation()
  const handleDelete = async (e) => {
    await deleteProject({ id: e })
  }


  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      h="100%"
    >
      <Box
        position="relative"
        bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
        borderRadius="xl"
        overflow="hidden"
        h="100%"
        display="flex"
        flexDirection="column"
        border={"1px solid rgba(54, 54, 54, 0.7)"}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: "0 1px 10px rgba(255, 76, 32, 0.16)"
        }}
      >
        {/* Accent Border */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="3px"
          bg="linear-gradient(90deg, #ff4b20 0%, #ff8c42 100%)"
        />

        {/* Image Section with Overlay */}
        <Box position="relative" h="240px" overflow="hidden" flexShrink={0}>
          <Image
            src={project.icon?.url || project.image || "/default-project.jpg"}
            alt={project.title}
            w="100%"
            h="100%"
            objectFit="cover"
            filter="brightness(0.8)"
            transition="all 0.4s ease"
            _groupHover={{ filter: "brightness(1)", transform: "scale(1.1)" }}
          />

          {/* Dark Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)"
          />

          {/* Top Bar with Badges and Edit */}
          <HStack
            position="absolute"
            top="4"
            left="4"
            right="4"
            justify="space-between"
            zIndex="2"
          >
            {/* Featured Badge */}
            {project.featured && (
              <Badge
                bg="linear-gradient(135deg, #ff4b20 0%, #ff6b3d 100%)"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                px="3"
                py="1.5"
                borderRadius="full"
                display="flex"
                alignItems="center"
                gap="1"
                boxShadow="0 4px 12px rgba(255, 75, 32, 0.4)"
              >
                <Box as="span" fontSize="xs">✦</Box>
                FEATURED
              </Badge>
            )}

            <Box flex="1" />

            {/* Edit Button */}
            <IconButton
              icon={<Edit size={16} />}
              size="sm"
              bg="rgba(26, 26, 26, 0.9)"
              backdropFilter="blur(10px)"
              color="#ff4b20"
              border="1px solid"
              borderColor="rgba(255, 75, 32, 0.3)"
              _hover={{
                bg: "#ff4b20",
                color: "white",
                borderColor: "#ff4b20",
                transform: "rotate(10deg) scale(1.1)"
              }}
              borderRadius="lg"
              onClick={onOpen}
              aria-label="Edit project"
              transition="all 0.2s"
            />
          </HStack>

          {/* Tech Stack Preview - Floating at bottom */}
          <HStack
            position="absolute"
            bottom="4"
            left="4"
            right="4"
            spacing="2"
            zIndex="2"
          >
            {project.technologies?.slice(0, 3).map((tech, index) => (
              <Badge
                key={index}
                bg="rgba(26, 26, 26, 0.85)"
                backdropFilter="blur(10px)"
                color="white"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.1)"
                fontSize="xs"
                px="3"
                py="1.5"
                borderRadius="lg"
                fontWeight="medium"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies?.length > 3 && (
              <Badge
                bg="rgba(255, 75, 32, 0.2)"
                backdropFilter="blur(10px)"
                color="#ff4b20"
                border="1px solid"
                borderColor="rgba(255, 75, 32, 0.3)"
                fontSize="xs"
                px="3"
                py="1.5"
                borderRadius="lg"
                fontWeight="bold"
              >
                +{project.technologies.length - 3}
              </Badge>
            )}
          </HStack>
        </Box>

        {/* Content Section */}
        <VStack
          p="6"
          align="start"
          spacing="4"
          flex="1"
          justify="space-between"
          bg="#1a1a1a"
        >
          {/* Title & Description */}
          <VStack align="start" spacing="3" w="100%">
            <Heading
              as="p"
              fontSize="lg"
              fontWeight="bold"
              color="white"
              noOfLines={1}
              letterSpacing="tight"
            >
              {project.title}
            </Heading>

            <Text
              fontSize="sm"
              color="gray.400"
              noOfLines={3}
              minH="63px"
              lineHeight="1.6"
            >
              {project.description || "No description available for this project."}
            </Text>
          </VStack>

          {/* Action Buttons */}
          <HStack w="100%" spacing="3">
            {/* Icon Buttons */}
            <HStack spacing="2">
              {project.githubLink && (
                <IconButton
                  as="a"
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<Github />}
                  size="md"
                  bg="rgba(255, 255, 255, 0.05)"
                  color="gray.400"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  borderRadius="xs"
                  _hover={{
                    bg: "rgba(255, 75, 32, 0.1)",
                    color: "#ff4b20",
                    borderColor: "#ff4b20",
                    transform: "translateY(-2px)"
                  }}
                  transition="all 0.2s"
                  aria-label="View on GitHub"
                />
              )}
              <IconButton
                as="button"
                href={project.githubLink}
                icon={!isDeleteProjectLoading ? <Trash2 /> : <Loader size="small" />}
                size="md"
                bg="rgba(255, 255, 255, 0.05)"
                color="gray.400"
                border="1px solid"
                onClick={() => handleDelete(project._id)}
                borderColor="rgba(255, 255, 255, 0.1)"
                borderRadius="xs"
                _hover={{
                  bg: "rgba(255, 75, 32, 0.1)",
                  color: "#ff4b20",
                  borderColor: "#ff4b20",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.2s"
                aria-label="View on GitHub"
              />
              {project.demoLink && (
                <IconButton
                  as="a"
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<ExternalLink size={18} />}
                  size="md"
                  bg="rgba(255, 255, 255, 0.05)"
                  color="gray.400"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  borderRadius="xs"
                  _hover={{
                    bg: "rgba(255, 75, 32, 0.1)",
                    color: "#ff4b20",
                    borderColor: "#ff4b20",
                    transform: "translateY(-2px)"
                  }}
                  transition="all 0.2s"
                  aria-label="View live demo"
                />
              )}
            </HStack>

            {/* View Details Button */}
            <Button2 text={"Details"} onClick={onOpen} to={`/projects/${project._id || project.id}`} />
            {/* <Button
              as={Link}
              to={`/projects/${project._id || project.id}`}
              flex="1"
              size="md"
              bg="linear-gradient(135deg, #ff4b20 0%, #ff6b3d 100%)"
              color="white"
              fontWeight="bold"
              borderRadius="lg"
              _hover={{
                bg: "linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(255, 75, 32, 0.4)"
              }}
              transition="all 0.2s ease-in-out"
            >
              Details
            </Button> */}
          </HStack>
        </VStack>

        {/* Edit Project Modal */}
        <ProjectModal
          isOpen={isOpen}
          onClose={onClose}
          project={project}
          isEdit={true}
        />
      </Box>
    </MotionBox>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getGithubProjectsAndUpdate, { isSuccess: isGitUpdateSuccess, isLoading: isGitUpdateLoading, isError: isGitUpdateError }] = useGetGithubProjectsAndUpdateMutation()
  const { isLoading, isError, error } = useGetProjectsQuery();
  const projects = useSelector(selectAllProjects);

  const handleGitSync = async () => {
    await getGithubProjectsAndUpdate();
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTech, setFilterTech] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project =>
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies?.some(tech =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (filterTech !== "all") {
      filtered = filtered.filter(project =>
        project.technologies?.some(tech =>
          tech.toLowerCase() === filterTech.toLowerCase()
        )
      );
    }

    // Sort projects
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "name":
        filtered.sort((a, b) => a.title?.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [projects, searchTerm, filterTech, sortBy]);

  // Get unique technologies for filter
  const technologies = useMemo(() => {
    const allTechs = projects.flatMap(project => project.technologies || []);
    return [...new Set(allTechs)].sort();
  }, [projects]);

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Text className="sec-text" color="gray.400">
          Something went wrong: {error?.data?.message || "Please try again"}
        </Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" pt={"10px"} pb="100px" px={{ base: 4, lg: 8 }}>
      {/* Add Project Modal */}
      <ProjectModal isOpen={isOpen} onClose={onClose} />

      {/* Header */}
      <VStack spacing="6" mb="12" textAlign="center">
        <Text className="sec-text" fontSize={{ base: "sm", md: "lg" }} color="gray.400">
          [ MY PORTFOLIO ]
        </Text>
        <Text
          className="pri-text"
          fontSize={{ base: "4xl", md: "6xl" }}
          color="white"
          lineHeight="1.1"
        >
          PROJECTS
        </Text>
        <Text className="sec-text" color="gray.400" maxW="2xl">
          A collection of my latest work and personal projects
        </Text>

        {/* Add Project Button */}
        <HStack spacing="4" width={"full"}>
          <Button2 text={"Add New Project"} func={onOpen} />
          <Button2 border={true} text={isGitUpdateLoading ? <Loader size="small" /> : "Update GitHub Projects"} func={handleGitSync} />
        </HStack>
      </VStack>

      {/* Filters */}
      <Flex
        direction={{ base: "column", md: "row" }}
        gap="4"
        mb="8"
        p="6"
        bg="#2b2b2b"
        border="1px solid"
        borderColor="gray.700"
        borderRadius="sm"
      >
        <HStack flex="1" spacing="4">
          <Box position="relative" flex="1">
            <Search
              size={20}
              color="#6B7280"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              pl="40px"
              bg="#1a1a1a"
              borderColor="gray.600"
              color="white"
              _placeholder={{ color: "gray.500" }}
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "#ff4b20", boxShadow: "none" }}
            />
          </Box>
        </HStack>

        <HStack spacing="4">
          <Select
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
            bg="#1a1a1a"
            borderColor="gray.600"
            color="white"
            _hover={{ borderColor: "gray.500" }}
            _focus={{ borderColor: "#ff4b20", boxShadow: "none" }}
          >
            <option value="all" style={{ background: '#1a1a1a' }}>All Technologies</option>
            {technologies.map(tech => (
              <option key={tech} value={tech} style={{ background: '#1a1a1a' }}>
                {tech}
              </option>
            ))}
          </Select>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            bg="#1a1a1a"
            borderColor="gray.600"
            color="white"
            _hover={{ borderColor: "gray.500" }}
            _focus={{ borderColor: "#ff4b20", boxShadow: "none" }}
          >
            <option value="newest" style={{ background: '#1a1a1a' }}>Newest First</option>
            <option value="oldest" style={{ background: '#1a1a1a' }}>Oldest First</option>
            <option value="featured" style={{ background: '#1a1a1a' }}>Featured</option>
            <option value="name" style={{ background: '#1a1a1a' }}>Name A-Z</option>
          </Select>
        </HStack>
      </Flex>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Flex justify="center" align="center" minH="300px">
          <Text className="sec-text" color="gray.400" fontSize="lg">
            No projects found matching your criteria.
          </Text>
        </Flex>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing="6"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id || project.id}
              project={project}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default React.memo(Projects);