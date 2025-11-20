import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Image,
  Badge,
  Button,
  IconButton,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link as ChakraLink,
  Code,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Github,
  ExternalLink,
  Server,
  Database,
  Mail,
  Globe,
  Calendar,
  Clock,
  Star,
  Code2,
  Layers,
  Upload,
  FileText,
  Link2,
  Eye,
  Settings,
  Shield,
} from "lucide-react";

// Mock data for demonstration
const mockProject = {
  _id: "proj_123456789",
  title: "E-Commerce Platform",
  description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.",
  featured: true,
  image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
  technologies: ["React", "Node.js", "MongoDB", "Express", "Redux", "Stripe"],
  githubLink: "https://github.com/username/ecommerce-platform",
  demoLink: "https://ecommerce-demo.vercel.app",
  documentationLink: "https://docs.ecommerce-demo.com",
  
  // Database info
  database: {
    type: "MongoDB Atlas",
    host: "cluster0.mongodb.net",
    email: "admin@ecommerce.com",
    name: "ecommerce_production",
    connectionString: "mongodb+srv://...",
  },
  
  // Server info
  server: {
    provider: "Railway",
    url: "https://api.ecommerce-platform.railway.app",
    email: "deploy@railway.com",
    environment: "Production",
    region: "us-west-1",
  },
  
  // Frontend info
  frontend: {
    provider: "Vercel",
    url: "https://ecommerce-demo.vercel.app",
    email: "deploy@vercel.com",
    buildTool: "Vite",
    framework: "React 18",
  },
  
  // Additional services
  services: {
    emailProvider: "SendGrid",
    authProvider: "JWT + bcrypt",
    storageProvider: "AWS S3",
    cdnProvider: "Cloudflare",
  },
  
  // API details
  api: {
    endpoint: "https://api.ecommerce-platform.railway.app/api/v1",
    version: "v1.0.0",
    documentation: "https://api-docs.ecommerce-platform.com",
  },
  
  // Repository
  repository: {
    mainBranch: "main",
    stars: 47,
  },
  
  // Metadata
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-11-18T14:22:00Z",
  lastDeployed: "2024-11-18T14:22:00Z",
  status: "Active",
};

const InfoRow = ({ icon: Icon, label, value, type = "text" }) => {
  const renderValue = () => {
    if (!value || value === "N/A") {
      return (
        <Text color="gray.500" fontStyle="italic">
          Not specified
        </Text>
      );
    }

    switch (type) {
      case "link":
        return (
          <ChakraLink
            href={value}
            isExternal
            color="#ff4b20"
            fontWeight="medium"
            display="flex"
            alignItems="center"
            gap="2"
            _hover={{ textDecoration: "underline" }}
          >
            {value.length > 40 ? value.substring(0, 40) + "..." : value}
            <ExternalLink size={14} />
          </ChakraLink>
        );
      case "email":
        return (
          <ChakraLink
            href={`mailto:${value}`}
            color="#ff4b20"
            fontWeight="medium"
            display="flex"
            alignItems="center"
            gap="2"
            _hover={{ textDecoration: "underline" }}
          >
            {value}
            <Mail size={14} />
          </ChakraLink>
        );
      case "date":
        return (
          <Text color="white" fontWeight="medium">
            {new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        );
      case "code":
        return (
          <Code
            bg="rgba(255, 75, 32, 0.1)"
            color="#ff4b20"
            px="3"
            py="1"
            borderRadius="sm"
            fontSize="sm"
          >
            {value}
          </Code>
        );
      default:
        return (
          <Text color="white" fontWeight="medium">
            {value}
          </Text>
        );
    }
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      py="3"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.05)"
    >
      <HStack spacing="3" color="gray.400">
        {Icon && <Icon size={18} />}
        <Text fontSize="sm" fontWeight="medium">
          {label}
        </Text>
      </HStack>
      <Box textAlign="right" maxW="60%">
        {renderValue()}
      </Box>
    </Flex>
  );
};

const SectionCard = ({ title, icon: Icon, children }) => {
  const cardBg = useColorModeValue("white", "#1a1a1a");
  const borderColor = useColorModeValue("gray.200", "rgba(255, 255, 255, 0.1)");

  return (
    <Card
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="sm"
      overflow="hidden"
    >
      <Box
        bg="linear-gradient(135deg, #ff4b20 0%, #ff6b3d 100%)"
        px="6"
        py="4"
      >
        <HStack spacing="3">
          {Icon && <Icon size={20} color="white" />}
          <Heading as={"p"} size="sm" color="white">
            [ {title} ]
          </Heading>
        </HStack>
      </Box>
      <CardBody p="6">{children}</CardBody>
    </Card>
  );
};

const ProjectDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const project = mockProject;

  return (
    <Box minH="100vh" pt="20px" pb="100px" px={{ base: 4, lg: 8 }}>
      {/* Header */}
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        mb="8"
        flexDirection={{ base: "column", md: "row" }}
        gap="4"
      >
        <HStack spacing="4">
          <IconButton
            icon={<ArrowLeft size={20} />}
            bg="rgba(255, 255, 255, 0.05)"
            color="gray.400"
            borderRadius="sm"
            _hover={{
              bg: "rgba(255, 75, 32, 0.1)",
              color: "#ff4b20",
            }}
            aria-label="Go back"
          />
          <VStack align="start" spacing="1">
            <Heading size="lg" color="white">
              {project.title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Project ID: {project._id}
            </Text>
          </VStack>
        </HStack>

        <HStack spacing="3">
          <Button
            leftIcon={<Edit size={18} />}
            borderRadius={"sm"}
            bg="linear-gradient(135deg, #ff4b20 0%, #ff6b3d 100%)"
            color="white"
            _hover={{
              bg: "linear-gradient(135deg, #ff6b3d 0%, #ff8c42 100%)",
            }}
          >
            Edit Project
          </Button>
          <IconButton
            icon={<Trash2 size={18} />}
            colorScheme="red"
            variant="outline"
            aria-label="Delete project"
          />
        </HStack>
      </Flex>

      {/* Featured Badge */}
      {project.featured && (
        <Alert
          status="info"
          mb="6"
          borderRadius="sm"
          bg="rgba(255, 75, 32, 0.1)"
          border="1px solid"
          borderColor="rgba(255, 75, 32, 0.3)"
        >
          <AlertIcon color="#ff4b20" />
          <Text color="#ff4b20" fontWeight="bold">
            ✦ This project is featured on your portfolio
          </Text>
        </Alert>
      )}

      {/* Project Image */}
      <Box mb="8" borderRadius="sm" overflow="hidden" position="relative">
        <Image
          src={project.image}
          alt={project.title}
          w="100%"
          h="400px"
          objectFit="cover"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="100px"
          bgGradient="linear(to-t, rgba(0,0,0,0.8), transparent)"
        />
      </Box>

      {/* Tabs for Different Sections */}
      <Tabs colorScheme="orange" variant="enclosed">
        <TabList borderColor="rgba(255, 255, 255, 0.1)">
          <Tab
            color="gray.400"
            borderRadius={"sm"}
            _selected={{
              color: "#ff4b20",
              borderColor: "#ff4b20",
              borderBottomColor: "#0a0a0a",
            }}
          >
            <HStack spacing="2">
              <FileText size={16} />
              <Text display={{ base: "none", md: "block" }}>Overview</Text>
            </HStack>
          </Tab>
          <Tab
            color="gray.400"
            borderRadius={"sm"}
            _selected={{
              color: "#ff4b20",
              borderColor: "#ff4b20",
              borderBottomColor: "#0a0a0a",
            }}
          >
            <HStack spacing="2">
              <Server size={16} />
              <Text display={{ base: "none", md: "block" }}>Infrastructure</Text>
            </HStack>
          </Tab>
          <Tab
            color="gray.400"
            borderRadius={"sm"}
            _selected={{
              color: "#ff4b20",
              borderColor: "#ff4b20",
              borderBottomColor: "#0a0a0a",
            }}
          >
            <HStack spacing="2">
              <Code2 size={16} />
              <Text display={{ base: "none", md: "block" }}>Technical</Text>
            </HStack>
          </Tab>
          <Tab
            color="gray.400"
            borderRadius={"sm"}
            _selected={{
              color: "#ff4b20",
              borderColor: "#ff4b20",
              borderBottomColor: "#0a0a0a",
            }}
          >
            <HStack spacing="2">
              <Settings size={16} />
              <Text display={{ base: "none", md: "block" }}>Metadata</Text>
            </HStack>
          </Tab>
        </TabList>

        <TabPanels>
          {/* Overview Tab */}
          <TabPanel px="0" pt="6">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
              <SectionCard title="Project Information" icon={FileText}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={FileText}
                    label="Title"
                    value={project.title}
                  />
                  <InfoRow
                    icon={Eye}
                    label="Status"
                    value={project.featured ? "Featured" : "Standard"}
                  />
                  <Box py="4">
                    <Text fontSize="sm" color="gray.400" mb="2" fontWeight="medium">
                      Description
                    </Text>
                    <Text color="white" lineHeight="1.7">
                      {project.description}
                    </Text>
                  </Box>
                </VStack>
              </SectionCard>

              <SectionCard title="Quick Links" icon={Link2}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Github}
                    label="GitHub Repository"
                    value={project.githubLink}
                    type="link"
                  />
                  <InfoRow
                    icon={Globe}
                    label="Live Demo"
                    value={project.demoLink}
                    type="link"
                  />
                  <InfoRow
                    icon={ExternalLink}
                    label="Documentation"
                    value={project.documentationLink}
                    type="link"
                  />
                </VStack>
              </SectionCard>

              <SectionCard title="Technologies Used" icon={Layers}>
                <Flex wrap="wrap" gap="2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      bg="rgba(255, 75, 32, 0.1)"
                      color="#ff4b20"
                      border="1px solid"
                      borderColor="rgba(255, 75, 32, 0.3)"
                      px="3"
                      py="2"
                      borderRadius="sm"
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      {tech}
                    </Badge>
                  ))}
                </Flex>
              </SectionCard>
            </SimpleGrid>
          </TabPanel>

          {/* Hosting & Infrastructure Tab */}
          <TabPanel px="0" pt="6">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
              <SectionCard title="Database Configuration" icon={Database}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Database}
                    label="Database Type"
                    value={project.database.type}
                  />
                  <InfoRow
                    icon={Server}
                    label="Database Host"
                    value={project.database.host}
                  />
                  <InfoRow
                    icon={Mail}
                    label="Database Email"
                    value={project.database.email}
                    type="email"
                  />
                  <InfoRow
                    icon={Shield}
                    label="Database Name"
                    value={project.database.name}
                    type="code"
                  />
                  <InfoRow
                    icon={Globe}
                    label="Connection String"
                    value="••••••••••"
                  />
                </VStack>
              </SectionCard>

              <SectionCard title="Backend Server" icon={Server}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Server}
                    label="Hosting Provider"
                    value={project.server.provider}
                  />
                  <InfoRow
                    icon={Globe}
                    label="Server URL"
                    value={project.server.url}
                    type="link"
                  />
                  <InfoRow
                    icon={Mail}
                    label="Server Email"
                    value={project.server.email}
                    type="email"
                  />
                  <InfoRow
                    icon={Settings}
                    label="Environment"
                    value={project.server.environment}
                  />
                  <InfoRow
                    icon={Code2}
                    label="Server Region"
                    value={project.server.region}
                  />
                </VStack>
              </SectionCard>

              <SectionCard title="Frontend Hosting" icon={Upload}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Upload}
                    label="Hosting Provider"
                    value={project.frontend.provider}
                  />
                  <InfoRow
                    icon={Globe}
                    label="Frontend URL"
                    value={project.frontend.url}
                    type="link"
                  />
                  <InfoRow
                    icon={Mail}
                    label="Frontend Email"
                    value={project.frontend.email}
                    type="email"
                  />
                  <InfoRow
                    icon={Code2}
                    label="Build Tool"
                    value={project.frontend.buildTool}
                  />
                  <InfoRow
                    icon={Settings}
                    label="Framework"
                    value={project.frontend.framework}
                  />
                </VStack>
              </SectionCard>

              <SectionCard title="Additional Services" icon={Layers}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Mail}
                    label="Email Service"
                    value={project.services.emailProvider}
                  />
                  <InfoRow
                    icon={Shield}
                    label="Authentication"
                    value={project.services.authProvider}
                  />
                  <InfoRow
                    icon={Database}
                    label="Storage Service"
                    value={project.services.storageProvider}
                  />
                  <InfoRow
                    icon={Server}
                    label="CDN Provider"
                    value={project.services.cdnProvider}
                  />
                </VStack>
              </SectionCard>
            </SimpleGrid>
          </TabPanel>

          {/* Technical Details Tab */}
          <TabPanel px="0" pt="6">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
              <SectionCard title="API & Integration" icon={Code2}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Link2}
                    label="API Endpoint"
                    value={project.api.endpoint}
                    type="link"
                  />
                  <InfoRow
                    icon={Shield}
                    label="API Version"
                    value={project.api.version}
                  />
                  <InfoRow
                    icon={Code2}
                    label="Documentation"
                    value={project.api.documentation}
                    type="link"
                  />
                </VStack>
              </SectionCard>

              <SectionCard title="Repository Details" icon={Github}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Github}
                    label="Repository URL"
                    value={project.githubLink}
                    type="link"
                  />
                  <InfoRow
                    icon={Code2}
                    label="Main Branch"
                    value={project.repository.mainBranch}
                  />
                  <InfoRow
                    icon={Star}
                    label="Repository Stars"
                    value={project.repository.stars.toString()}
                  />
                </VStack>
              </SectionCard>

              <SectionCard title="Environment Variables" icon={Settings}>
                <Alert status="warning" borderRadius="sm">
                  <AlertIcon />
                  <Text fontSize="sm">
                    Environment variables are securely stored and not displayed for security reasons
                  </Text>
                </Alert>
              </SectionCard>
            </SimpleGrid>
          </TabPanel>

          {/* Metadata Tab */}
          <TabPanel px="0" pt="6">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
              <SectionCard title="Timestamps" icon={Clock}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Calendar}
                    label="Created At"
                    value={project.createdAt}
                    type="date"
                  />
                  <InfoRow
                    icon={Clock}
                    label="Last Updated"
                    value={project.updatedAt}
                    type="date"
                  />
                  <InfoRow
                    icon={Upload}
                    label="Last Deployed"
                    value={project.lastDeployed}
                    type="date"
                  />
                </VStack>
              </SectionCard>

              <SectionCard title="Additional Info" icon={FileText}>
                <VStack align="stretch" spacing="0">
                  <InfoRow
                    icon={Eye}
                    label="Project ID"
                    value={project._id}
                    type="code"
                  />
                  <InfoRow
                    icon={Star}
                    label="Featured"
                    value={project.featured ? "Yes" : "No"}
                  />
                  <InfoRow
                    icon={Settings}
                    label="Status"
                    value={project.status}
                  />
                </VStack>
              </SectionCard>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProjectDetail;