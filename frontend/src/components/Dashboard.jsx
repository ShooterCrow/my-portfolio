import { useSelector } from "react-redux"
// import { selectCurrentToken } from "../features/auth/authSlice"
import { selectAllUsers, useGetUsersQuery } from "@/features/users/usersApiSlice"
import { selectAllProjects, useDeleteProjectMutation, useGetProjectsQuery } from "@/features/projects/projectsApiSlice"
import { selectAllContactMsgs, useGetContactMsgsQuery } from "@/features/contact/contactApiSlice"
import {
  Box, Flex, Heading, Text, Grid, Divider, Badge, VStack, HStack,
  useColorModeValue, IconButton, Menu, MenuButton, MenuList, MenuItem,
  useBreakpointValue, Stack,
} from "@chakra-ui/react"
import Button2 from "./buttons/Button2"
import { Link, Outlet } from "react-router-dom"
import { useState } from "react"
import { FaHamburger as HamburgerIcon, } from "react-icons/fa"
import { EditIcon } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import UsersList from "@/features/users/UsersList"
import ContactMsgsList from "@/features/contact/ContactMsgsList"
import ProjectListDash from "@/features/projects/ProjectListDash"


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users")
  const [deleteProject, { isLoading }] = useDeleteProjectMutation()

  const username = useAuth()

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

  const borderColor = useColorModeValue("gray.200", "gray.600")

  // Responsive adjustments
  const isMobile = useBreakpointValue({ base: true, md: false })
  const headingSize = useBreakpointValue({ base: "md", md: "lg" })
  const tabPadding = useBreakpointValue({ base: "2", md: "5" })

  // Tab navigation
  const tabs = [
    { id: "users", label: "Users" },
    { id: "projects", label: "Projects" },
    { id: "messages", label: "Messages" }
  ]

  return (
    <Box mt={{ base: "100px", md: "120px" }} mx="auto" maxW="1200px" px={{ base: 3, md: 4 }} mb={10}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={6}
        flexDirection={{ base: "column", md: "row" }}>
        <Heading
          size={headingSize}
          fontWeight="bold"
          className="pri-text"
          mb={{ base: 4, md: 0 }} >
          Admin Dashboard
        </Heading>

        {isMobile ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <Link to="/users/new">
                <MenuItem icon={<EditIcon />}>Add New User</MenuItem>
              </Link>
              <Link to="addproject">
                <MenuItem icon={<EditIcon />}>Add New Project</MenuItem>
              </Link>
              <Link to={`/users/${currentUser?.id}/edit`}>
                <MenuItem icon={<EditIcon />}>Edit My Profile</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        ) : (
          <HStack spacing={3}>
            <Link to="/users/new">
              <Button2 text="Add New User" func={() => { }} />
            </Link>
            <Link to="/addproject">
              <Button2 text="Add New Project" func={() => { }} />
            </Link>
            <Link to={`/users/${currentUser?.id}/edit`}>
              <Button2 text="Edit My Profile" func={() => { }} />
            </Link>
          </HStack>
        )}
      </Flex>

      <Divider mb={6} />

      {/* Tab Navigation */}
      <Flex
        mb={6}
        borderBottom="1px"
        borderColor={borderColor}
        overflowX={{ base: "auto", md: "visible" }}
        width="100%" >

        {tabs.map(tab => (
          <Box
            key={tab.id}
            py={2}
            px={tabPadding}
            cursor="pointer"
            fontWeight={activeTab === tab.id ? "semibold" : "normal"}
            borderBottom={activeTab === tab.id ? "2px solid" : "none"}
            borderColor="blue.500"
            className={activeTab === tab.id ? "pri-text" : "sec-text"}
            onClick={() => setActiveTab(tab.id)}
            whiteSpace="nowrap">

            {tab.label}
            <Badge ml={2} colorScheme={tab.id === "messages" ? "red" : "blue"} borderRadius="full">
              {tab.id === "users" ? users.length : tab.id === "projects" ? projects.length : contactMsgs.length}
            </Badge>
          </Box>
        ))}
      </Flex>

      {/* Users Tab */}
      {activeTab === "users" && <UsersList />}

      {/* Projects Tab */}
      {activeTab === "projects" && <ProjectListDash /> }

      {/* Messages Tab */}
      {activeTab === "messages" && <ContactMsgsList />}
      <Outlet />
    </Box>
  )
}

export default Dashboard