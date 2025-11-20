import { useSelector } from "react-redux"
import { selectAllUsers, useGetUsersQuery } from "@/features/users/usersApiSlice"
import { selectAllProjects, useDeleteProjectMutation, useGetGithubProjectsAndUpdateMutation, useGetProjectsQuery } from "@/features/projects/projectsApiSlice"
import { selectAllContactMsgs, useGetContactMsgsQuery } from "@/features/contact/contactApiSlice"
import {
  Box, Flex, Heading, Text, Grid, Divider, Badge, VStack, HStack,
  useColorModeValue, IconButton, Menu, MenuButton, MenuList, MenuItem,
  useBreakpointValue, Stack, SimpleGrid, Stat, StatLabel, StatNumber,
  StatHelpText, Card, CardBody, Avatar, AvatarGroup,
  useToast,
} from "@chakra-ui/react"
import Button2 from "../../components/buttons/Button2"
import { Link, Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { Menu as MenuIcon, Users, FolderKanban, MessageSquare, TrendingUp, Activity, UserPlus, FolderPlus, Mail, BookOpen, Brain, GitBranch } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import UsersList from "@/features/users/UsersList"
import ContactMsgsList from "@/features/contact/ContactMsgsList"
import ProjectListDash from "@/features/projects/ProjectListDash"
import Loader from "@/components/otherComps/Loader"

// Demo data for development
const DEMO_STATS = {
  learn: {
    total: 15,
    inProgress: 8,
    completed: 5,
    trend: "+15%"
  },
  projects: {
    total: 24,
    active: 18,
    completed: 6,
    trend: "+8%"
  },
  messages: {
    total: 45,
    unread: 12,
    responded: 33,
    trend: "+23%"
  },
  activity: {
    todayActions: 127,
    thisWeek: 892,
    avgResponse: "2.3h"
  }
}

const DEMO_RECENT_ACTIVITY = [
  { id: 1, type: "learn", action: "Started learning RTK Query", user: "You", time: "5 mins ago" },
  { id: 2, type: "project", action: "Project updated", user: "jane_smith", time: "12 mins ago" },
  { id: 3, type: "message", action: "New message received", user: "alice_wonder", time: "23 mins ago" },
  { id: 4, type: "learn", action: "Completed React Patterns", user: "You", time: "1 hour ago" },
  { id: 5, type: "project", action: "Project completed", user: "bob_builder", time: "2 hours ago" },
]

const DEMO_LEARN_TOPICS = [
  { id: 1, topic: "RTK Query Advanced Patterns", status: "in-progress", progress: 60 },
  { id: 2, topic: "Three.js Animations", status: "in-progress", progress: 35 },
  { id: 3, topic: "Node.js Performance Optimization", status: "pending", progress: 0 },
  { id: 4, topic: "GraphQL Best Practices", status: "completed", progress: 100 },
  { id: 5, topic: "Docker & Kubernetes", status: "in-progress", progress: 45 },
]

const Dashboard = () => {
  const [deleteProject, { isLoading }] = useDeleteProjectMutation()
  const location = useLocation()
  const [getGithubProjectsAndUpdate, { isSuccess: isGitUpdateSuccess, isLoading: isGitUpdateLoading, isError: isDeleteProjectError }] = useGetGithubProjectsAndUpdateMutation()

    const toast = useToast();
  
    useEffect(() => {
      if (isGitUpdateSuccess) {
        toast({
          title: "Sync Success!",
          description: "Git Projects has been syncronisez project has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (isDeleteProjectError) {
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
    }, [isGitUpdateSuccess, isDeleteProjectError]);
  
  const handleGitSync = async () => {
    await getGithubProjectsAndUpdate()
  }
  const { username } = useAuth()

  async (params) => {
    
  }

  useGetUsersQuery()
  useGetProjectsQuery()
  useGetContactMsgsQuery()
  const users = useSelector(selectAllUsers)
  const projects = useSelector(selectAllProjects)
  const contactMsgs = useSelector(selectAllContactMsgs)

  const currentUser = users.find(user => user.username === username)

  const handleDelete = async (id) => {
    const result = await deleteProject({ id })
  }

  const bgColor = useColorModeValue("gray.50", "#1A1A1A")
  const cardBg = useColorModeValue("white", "#131313")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const statBg = useColorModeValue("gray.100", "#1a1a1a")

  // Responsive adjustments
  const isMobile = useBreakpointValue({ base: true, md: false })

  // Check if we're on a nested route
  const isNestedRoute = location.pathname !== "/dashboard"

  // If on nested route, show the Outlet content
  if (isNestedRoute) {
    return <Outlet />
  }

  return (
    <Box bg={bgColor} minH="100vh" pt={{ base: "10px", md: "20px" }}>
      <Box maxW="1400px" mx="auto" px={{ base: 3, md: 6 }}>

        {/* Main Content */}
        <Box py={6}>

          {/* Header */}
          <Flex
            justifyContent="space-between"
            alignItems={{ base: "start", md: "center" }}
            mb={6}
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            <VStack align="start" spacing={1}>
              <Heading
                size="lg"
                fontWeight="bold"
                className="pri-text" > Dashboard Overview </Heading>
              <Text fontSize="sm" color="gray.500">
                Welcome back, {username || "Admin"}
              </Text>
            </VStack>

            {isMobile ? (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<MenuIcon />}
                  variant='outline'
                  size="sm"
                />
                <MenuList>
                  <Divider my={2} />
                  <Link to="/dashboard/users/new">
                    <MenuItem icon={<UserPlus size={16} />}>Add New User</MenuItem>
                  </Link>
                  <Link to="/dashboard/projects/addproject">
                    <MenuItem icon={<FolderPlus size={16} />}>Add New Project</MenuItem>
                  </Link>
                  <Link to={`/dashboard/users/${currentUser?._id}/edit`}>
                    <MenuItem icon={<Mail size={16} />}>Edit My Profile</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={3}>
                <Link onClick={handleGitSync}>
                  <Button2 icon={<GitBranch size={22} />} text={isGitUpdateLoading ? <Loader size="small" /> : "Sync Git Projects"} func={() => { }} />
                </Link>-
                <Link to="/dashboard/projects/addproject">
                  <Button2 icon={<FolderPlus size={22} />} text="Add Project" func={() => { }} />
                </Link>
              </HStack>
            )}
          </Flex>

          {/* Overview Tab */}
          <VStack spacing={6} align="stretch">
            {/* Stats Grid */}
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
              {/* Learning Topics */}
              <Card bg={cardBg} border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box
                        p={2}
                        borderRadius="md"
                        bg="blue.500"
                        color="white"
                      >
                        <Brain size={20} />
                      </Box>
                      <Badge colorScheme="green" fontSize="xs">
                        {DEMO_STATS.learn.trend}
                      </Badge>
                    </Flex>
                    <StatNumber className="pri-text" fontSize="2xl">
                      {DEMO_STATS.learn.total}
                    </StatNumber>
                    <StatLabel color="gray.500" fontSize="sm">
                      Learning Topics
                    </StatLabel>
                    <StatHelpText fontSize="xs" color="gray.600">
                      {DEMO_STATS.learn.inProgress} in progress
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              {/* Total Projects */}
              <Card bg={cardBg} border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box
                        p={2}
                        borderRadius="md"
                        bg="purple.500"
                        color="white"
                      >
                        <FolderKanban size={20} />
                      </Box>
                      <Badge colorScheme="green" fontSize="xs">
                        {DEMO_STATS.projects.trend}
                      </Badge>
                    </Flex>
                    <StatNumber className="pri-text" fontSize="2xl">
                      {projects.length || DEMO_STATS.projects.total}
                    </StatNumber>
                    <StatLabel color="gray.500" fontSize="sm">
                      Total Projects
                    </StatLabel>
                    <StatHelpText fontSize="xs" color="gray.600">
                      {DEMO_STATS.projects.active} active
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              {/* Messages */}
              <Card bg={cardBg} border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box
                        p={2}
                        borderRadius="md"
                        bg="orange.500"
                        color="white"
                      >
                        <MessageSquare size={20} />
                      </Box>
                      <Badge colorScheme="red" fontSize="xs">
                        {DEMO_STATS.messages.trend}
                      </Badge>
                    </Flex>
                    <StatNumber className="pri-text" fontSize="2xl">
                      {contactMsgs.length || DEMO_STATS.messages.total}
                    </StatNumber>
                    <StatLabel color="gray.500" fontSize="sm">
                      Messages
                    </StatLabel>
                    <StatHelpText fontSize="xs" color="gray.600">
                      {DEMO_STATS.messages.unread} unread
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              {/* Activity */}
              <Card bg={cardBg} border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box
                        p={2}
                        borderRadius="md"
                        bg="green.500"
                        color="white"
                      >
                        <TrendingUp size={20} />
                      </Box>
                      <Badge colorScheme="blue" fontSize="xs">
                        Live
                      </Badge>
                    </Flex>
                    <StatNumber className="pri-text" fontSize="2xl">
                      {DEMO_STATS.activity.todayActions}
                    </StatNumber>
                    <StatLabel color="gray.500" fontSize="sm">
                      Project Ideas
                    </StatLabel>
                    <StatHelpText fontSize="xs" color="gray.600">
                      {DEMO_STATS.activity.thisWeek} Ongoing
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Recent Activity & Quick Stats */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Recent Activity */}
              <Card bg={cardBg} border="1px" borderColor={borderColor}>
                <CardBody>
                  <Heading size="sm" mb={4} className="pri-text">
                    Recent Activity
                  </Heading>
                  <VStack align="stretch" spacing={3}>
                    {DEMO_RECENT_ACTIVITY.map(activity => (
                      <Box
                        key={activity.id}
                        p={3}
                        borderRadius="md"
                        bg={statBg}
                        _hover={{ bg: useColorModeValue("gray.200", "#1f1f1f") }}
                        transition="all 0.2s"
                      >
                        <HStack justify="space-between">
                          <VStack align="start" spacing={0}>
                            <Text fontSize="sm" className="pri-text">
                              {activity.action}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              by {activity.user}
                            </Text>
                          </VStack>
                          <Text fontSize="xs" color="gray.600">
                            {activity.time}
                          </Text>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </CardBody>
              </Card>

              {/* Quick Stats */}
              <Card bg={cardBg} border="1px" borderColor={borderColor}>
                <CardBody>
                  <Heading size="sm" mb={4} className="pri-text">
                    Quick Stats
                  </Heading>
                  <VStack align="stretch" spacing={4}>
                    <Box>
                      <Flex justify="space-between" mb={2}>
                        <Text fontSize="sm" color="gray.500">Learning Progress</Text>
                        <Text fontSize="sm" className="pri-text" fontWeight="semibold">
                          {DEMO_STATS.learn.inProgress} / {DEMO_STATS.learn.total}
                        </Text>
                      </Flex>
                      <Box w="100%" h="2" bg={statBg} borderRadius="full">
                        <Box w="53%" h="100%" bg="blue.500" borderRadius="full" />
                      </Box>
                    </Box>

                    <Box>
                      <Flex justify="space-between" mb={2}>
                        <Text fontSize="sm" color="gray.500">Completed Projects</Text>
                        <Text fontSize="sm" className="pri-text" fontWeight="semibold">
                          {DEMO_STATS.projects.completed}
                        </Text>
                      </Flex>
                      <Box w="100%" h="2" bg={statBg} borderRadius="full">
                        <Box w="25%" h="100%" bg="purple.500" borderRadius="full" />
                      </Box>
                    </Box>

                    <Box>
                      <Flex justify="space-between" mb={2}>
                        <Text fontSize="sm" color="gray.500">Response Rate</Text>
                        <Text fontSize="sm" className="pri-text" fontWeight="semibold">
                          73%
                        </Text>
                      </Flex>
                      <Box w="100%" h="2" bg={statBg} borderRadius="full">
                        <Box w="73%" h="100%" bg="green.500" borderRadius="full" />
                      </Box>
                    </Box>

                    <Divider />

                    <Box p={3} bg={statBg} borderRadius="md">
                      <Text fontSize="xs" color="gray.500" mb={1}>
                        Average Response Time
                      </Text>
                      <Text fontSize="2xl" className="pri-text" fontWeight="bold">
                        {DEMO_STATS.activity.avgResponse}
                      </Text>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard