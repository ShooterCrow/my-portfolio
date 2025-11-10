import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Film,
    ClipboardList,
    ChevronLeft,
    ChevronRight,
    Gift,
    MoreHorizontal,
    X,
    UserPlus,
    UserCog2,
    Wallet,
    ListCheck,
    MessageCircle,
    School,
    Users,
    FolderKanban,
    MessageSquare,
    Brain
} from 'lucide-react';
import { useDashboardLayout } from './DashboardLayoutContext';
import { selectCurrentUserProfile, useGetUserProfileQuery } from '../../features/users/usersApiSlice';
import { useSelector } from 'react-redux';
import {
    Box,
    Flex,
    Text,
    Button,
    VStack,
    HStack,
    Badge,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useBreakpointValue,
    useColorModeValue,
    Stack,
    Icon,
    Collapse
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const UserLayout = () => {
    const location = useLocation();
    const {
        sidebarCollapsed,
        toggleSidebar,
        isMobile,
        isTablet,
        showMoreMenu,
        toggleMoreMenu
    } = useDashboardLayout();

    const isActive = (path) => {
        if (path === "/dashboard") {
            return location.pathname === "/dashboard";
        } else {
            return location.pathname.includes(path);
        }
    }

    const { isLoading } = useGetUserProfileQuery('User', {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        retry: 3,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 3000)
    });
    const user = useSelector(selectCurrentUserProfile);

    const sidebarLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: 0 },
        { icon: FolderKanban, label: 'Projects', path: '/dashboard/projects', badge: 1 },
        { icon: Brain, label: 'Learn', path: '/dashboard/learn', badge: 1 },
        { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages', badge: 0 },
        { icon: Users, label: 'Users', path: '/dashboard/users', badge: 0 },
        { icon: UserCog2, label: 'Profile', path: '/dashboard/profile', badge: 0 },
    ];

    // For mobile/tablet, show first 3 items in bottom bar and rest in "More" menu
    const bottomBarLinks = sidebarLinks.slice(0, 3);
    const moreLinks = sidebarLinks.slice(3);

    // Updated colors to match portfolio theme
    const bgColor = '#131313'; // Dark background
    const cardBgColor = '#1A1A1A'; // Card background
    const textColor = 'white';
    const primaryColor = '#ff4b20'; // Orange accent
    const secondaryTextColor = 'gray.400';
    const borderColor = 'gray.700';
    const mainBgColor = '#1A1A1A'; // Darker main background
    const hoverBgColor = '#1c1c1fff';

    const renderDesktopSidebar = () => (
        <MotionBox
            w={sidebarCollapsed ? '80px' : '280px'}
            bg={cardBgColor}
            borderRight="1px solid"
            borderColor={borderColor}
            transition="all 0.3s ease-in-out"
            position="fixed"
            h="100vh"
            zIndex="0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <VStack
                p={sidebarCollapsed ? 4 : 6}
                h="full"
                spacing={6}
                align={sidebarCollapsed ? 'center' : 'stretch'}
            >
                {/* Header */}
                <Flex
                    justify={sidebarCollapsed ? 'center' : 'space-between'}
                    align="center"
                    pb={4}
                    borderBottom="1px solid"
                    borderColor={borderColor}
                >
                    {!sidebarCollapsed && (
                        <VStack align="start" spacing={1}>
                            <Text className="sec-text" fontSize="sm" color={secondaryTextColor}>
                                [ USER DASHBOARD ]
                            </Text>
                            <Text className="pri-text" fontSize="xl" fontWeight="bold" color={textColor}>
                                CONTROL PANEL
                            </Text>
                        </VStack>
                    )}
                    <Button
                        onClick={toggleSidebar}
                        variant="ghost"
                        p={2}
                        borderRadius="sm"
                        _hover={{ bg: hoverBgColor }}
                        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        color={secondaryTextColor}
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight size={18} />
                        ) : (
                            <ChevronLeft size={18} />
                        )}
                    </Button>
                </Flex>

                {/* Navigation Links */}
                <VStack spacing={1} align="stretch" flex={1}>
                    {sidebarLinks.map((link) => {
                        const IconComponent = link.icon;
                        return (
                            <Box key={link.path} position="relative">
                                <Button
                                    as={Link}
                                    to={link.path}
                                    variant="ghost"
                                    w="full"
                                    justifyContent={sidebarCollapsed ? 'center' : 'flex-start'}
                                    leftIcon={
                                        <Icon
                                            as={IconComponent}
                                            boxSize={5}
                                            color={isActive(link.path) ? primaryColor : secondaryTextColor}
                                        />
                                    }
                                    px={4}
                                    py={4}
                                    borderRadius="sm"
                                    transition="all 0.2s ease-in-out"
                                    position="relative"
                                    bg={isActive(link.path) ? 'rgba(255, 75, 32, 0.1)' : 'transparent'}
                                    border={isActive(link.path) ? '1px solid' : '1px solid transparent'}
                                    borderColor={isActive(link.path) ? primaryColor : 'transparent'}
                                    color={isActive(link.path) ? primaryColor : textColor}
                                    _hover={{
                                        bg: hoverBgColor,
                                        borderColor: primaryColor,
                                        transform: 'translateX(4px)'
                                    }}
                                    fontWeight="medium"
                                >
                                    {!sidebarCollapsed && (
                                        <Text className="sec-text" fontSize="sm">
                                            {link.label}
                                        </Text>
                                    )}
                                </Button>
                                {link.badge > 0 && (
                                    <Badge
                                        position="absolute"
                                        top="2"
                                        right="2"
                                        bg={primaryColor}
                                        color="white"
                                        fontSize="10px"
                                        fontWeight="bold"
                                        minW="5"
                                        h="5"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        borderRadius="full"
                                        zIndex="1"
                                    >
                                        {link.badge}
                                    </Badge>
                                )}
                            </Box>
                        );
                    })}
                </VStack>

                {/* User Profile Section */}
                {!sidebarCollapsed && user && (
                    <Box
                        p={4}
                        bg={bgColor}
                        borderRadius="sm"
                        border="1px solid"
                        borderColor={borderColor}
                    >
                        <VStack align="start" spacing={2}>
                            <Text className="sec-text" fontSize="xs" color={secondaryTextColor}>
                                [ CURRENT USER ]
                            </Text>
                            <Text className="pri-text" fontSize="sm" color={textColor} fontWeight="medium">
                                {user.name || 'User'}
                            </Text>
                            <Text className="sec-text" fontSize="xs" color={secondaryTextColor}>
                                {user.email || 'user@example.com'}
                            </Text>
                        </VStack>
                    </Box>
                )}
            </VStack>
        </MotionBox>
    );

    const renderBottomBar = () => (
        <>
            {/* Bottom Navigation Bar */}
            <MotionBox
                position="fixed"
                bottom="0"
                left="0"
                right="0"
                bg={cardBgColor}
                borderTop="1px solid"
                borderColor={borderColor}
                shadow="lg"
                zIndex="overlay"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Flex justify="space-around" align="center" py={3} px={2}>
                    {bottomBarLinks.map((link) => {
                        const IconComponent = link.icon;
                        const active = isActive(link.path);
                        return (
                            <Box key={link.path} position="relative" flex="1">
                                <Button
                                    as={Link}
                                    to={link.path}
                                    variant="ghost"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    p={2}
                                    borderRadius="sm"
                                    flex="1"
                                    w="full"
                                    bg={active ? 'rgba(255, 75, 32, 0.1)' : 'transparent'}
                                    border={active ? '1px solid' : '1px solid transparent'}
                                    borderColor={active ? primaryColor : 'transparent'}
                                    color={active ? primaryColor : secondaryTextColor}
                                    _hover={{
                                        bg: hoverBgColor,
                                        color: primaryColor
                                    }}
                                >
                                    <Icon as={IconComponent} boxSize={5} mb={1} />
                                    {link.badge > 0 && (
                                        <Badge
                                            position="absolute"
                                            top="1"
                                            right="6"
                                            bg={primaryColor}
                                            color="white"
                                            fontSize="10px"
                                            fontWeight="bold"
                                            minW="4"
                                            h="4"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            borderRadius="full"
                                        >
                                            {link.badge}
                                        </Badge>
                                    )}
                                    <Text className="sec-text" fontSize="xs" fontWeight="medium" noOfLines={1}>
                                        {link.label}
                                    </Text>
                                </Button>
                            </Box>
                        );
                    })}

                    {/* More button */}
                    <Box position="relative" flex="1">
                        <Button
                            onClick={toggleMoreMenu}
                            variant="ghost"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            p={2}
                            borderRadius="sm"
                            flex="1"
                            w="full"
                            bg={showMoreMenu ? 'rgba(255, 75, 32, 0.1)' : 'transparent'}
                            border={showMoreMenu ? '1px solid' : '1px solid transparent'}
                            borderColor={showMoreMenu ? primaryColor : 'transparent'}
                            color={showMoreMenu ? primaryColor : secondaryTextColor}
                            _hover={{
                                bg: hoverBgColor,
                                color: primaryColor
                            }}
                        >
                            <Icon as={MoreHorizontal} boxSize={5} mb={1} />
                            {moreLinks.reduce((total, link) => total + link.badge, 0) > 0 && (
                                <Badge
                                    position="absolute"
                                    top="1"
                                    right="6"
                                    bg={primaryColor}
                                    color="white"
                                    fontSize="10px"
                                    fontWeight="bold"
                                    minW="4"
                                    h="4"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="full"
                                >
                                    {moreLinks.reduce((total, link) => total + link.badge, 0)}
                                </Badge>
                            )}
                            <Text className="sec-text" fontSize="xs" fontWeight="medium">
                                More
                            </Text>
                        </Button>
                    </Box>
                </Flex>
            </MotionBox>

            {/* More Menu Drawer */}
            <Drawer
                isOpen={showMoreMenu}
                placement="bottom"
                onClose={toggleMoreMenu}
            >
                <DrawerOverlay />
                <DrawerContent
                    borderTopRadius="sm"
                    bg={cardBgColor}
                    border="1px solid"
                    borderColor={borderColor}
                >
                    <DrawerHeader
                        borderBottom="1px solid"
                        borderColor={borderColor}
                    >
                        <Flex justify="space-between" align="center">
                            <VStack align="start" spacing={0}>
                                <Text className="sec-text" fontSize="xs" color={secondaryTextColor}>
                                    [ ADDITIONAL OPTIONS ]
                                </Text>
                                <Text className="pri-text" fontSize="lg" fontWeight="semibold" color={textColor}>
                                    More Menu
                                </Text>
                            </VStack>
                            <DrawerCloseButton
                                position="relative"
                                color={secondaryTextColor}
                                _hover={{ color: primaryColor }}
                            />
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody p={4}>
                        <VStack spacing={2} align="stretch">
                            {moreLinks.map((link) => {
                                const IconComponent = link.icon;
                                const active = isActive(link.path);
                                return (
                                    <Box key={link.path} position="relative">
                                        <Button
                                            as={Link}
                                            to={link.path}
                                            onClick={toggleMoreMenu}
                                            variant="ghost"
                                            w="full"
                                            justifyContent="flex-start"
                                            leftIcon={
                                                <Icon
                                                    as={IconComponent}
                                                    boxSize={5}
                                                    color={active ? primaryColor : secondaryTextColor}
                                                />
                                            }
                                            p={3}
                                            borderRadius="sm"
                                            bg={active ? 'rgba(255, 75, 32, 0.1)' : 'transparent'}
                                            border={active ? '1px solid' : '1px solid transparent'}
                                            borderColor={active ? primaryColor : 'transparent'}
                                            color={active ? primaryColor : textColor}
                                            _hover={{
                                                bg: hoverBgColor,
                                                borderColor: primaryColor,
                                                transform: 'translateX(4px)'
                                            }}
                                            transition="all 0.2s ease-in-out"
                                        >
                                            <Text className="sec-text" fontSize="sm" fontWeight="medium">
                                                {link.label}
                                            </Text>
                                        </Button>
                                        {link.badge > 0 && (
                                            <Badge
                                                position="absolute"
                                                top="3"
                                                right="3"
                                                bg={primaryColor}
                                                color="white"
                                                fontSize="10px"
                                                fontWeight="bold"
                                                minW="4"
                                                h="4"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                borderRadius="full"
                                            >
                                                {link.badge}
                                            </Badge>
                                        )}
                                    </Box>
                                );
                            })}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );

    return (
        <Flex minH="100vh" bg={mainBgColor}>
            {/* Desktop Sidebar */}
            {!isMobile && !isTablet && renderDesktopSidebar()}

            {/* Main Content */}
            <MotionBox
                flex="1"
                ml={(!isMobile && !isTablet) ? (sidebarCollapsed ? '80px' : '280px') : 0}
                pb={(isMobile || isTablet) ? '85px' : 0}
                p={(isMobile || isTablet) ? 4 : 6}
                transition="all 0.3s ease-in-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Outlet />
            </MotionBox>

            {/* Mobile/Tablet Bottom Bar */}
            {(isMobile || isTablet) && renderBottomBar()}
        </Flex>
    );
};

export default React.memo(UserLayout);