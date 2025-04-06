import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Grid,
    Flex,
    Button,
    SimpleGrid,
    useColorModeValue,
    VStack,
    HStack,
    Icon,
    keyframes,
    chakra,
    shouldForwardProp
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import {
    FiInfo,
    FiZap,
    FiRepeat,
    FiStar,
    FiGrid,
    FiPackage
} from 'react-icons/fi';
import Button1 from './buttons/Button1';

// Create ChakraBox for animations
const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

// Animation keyframes
const float = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(15px, 15px) rotate(5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const floatAnimation = `${float} 15s infinite ease-in-out`;
const floatAnimationReverse = `${float} 20s infinite ease-in-out reverse`;

const DesignProcessPage = () => {
    // Theme colors that match the HTML version
    const primaryColor = '#ff4b20';
    const secondaryColor = '#ff4b20';
    const darkBgColor = '#000';
    const cardBgColor = 'rgba(30, 30, 30, 0.8)';
    const textColor = '#e5e5e5';
    const accentColor = '#ff4b20';

    const primaryGlow = 'rgba(31, 17, 12, 0.5)';
    const secondaryGlow = 'rgba(68, 15, 15, 0.5)';

    return (
        <Box bg={""} color={textColor} pos="relative" overflow="hidden">
            {/* Background shapes */}
            <ChakraBox
                position="absolute"
                top="10%"
                left="5%"
                width="300px"
                height="300px"
                bg={primaryColor}
                opacity={0.07}
                zIndex={-1}
                clipPath="polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                animation={floatAnimation}
            />
            <ChakraBox
                position="absolute"
                bottom="10%"
                right="5%"
                width="200px"
                height="200px"
                bg={secondaryColor}
                opacity={0.07}
                zIndex={-1}
                clipPath="polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                animation={floatAnimationReverse}
            />

            {/* Header */}
            <Box
                as="header"
                pos="relative"
                py={{ base: "2rem", md: "4rem" }}
                px={{ base: "1rem", md: "2rem" }}
                textAlign="center"
                overflow="hidden"
            >
                <Box pos="relative" zIndex={1}>
                    <Text as="h2" className='sec-text' color={""}>
                        [ How We Work ]
                    </Text>
                    <Text
                        mb={6}
                        className='pri-text'
                        bgGradient={`linear(to-r, ${primaryColor}, ${secondaryColor})`}
                        bgClip="text" >
                        Our Design Process
                    </Text>
                </Box>
            </Box>

            <Container maxW="1200px" px={{ base: 4, md: 8 }}>
                {/* Glow Line */}
                <Box
                    h="1px"
                    w="100%"
                    my={8}
                    bgGradient={`linear(to-r, transparent, ${primaryColor}, transparent)`}
                />

                {/* How We Work Section */}
                <Box as="section" mb={16}>
                    <Text maxW="700px" mb={8}>
                        At WebDevLab, we follow a comprehensive and iterative design process to deliver exceptional results that exceed expectations. Our approach ensures that every project is built with precision, creativity, and technical excellence.
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        {/* Process Cards */}
                        {
                            [
                                {
                                    number: "01",
                                    title: "Initial Consultation & Agreement",
                                    description: "We begin with a comprehensive consultation, provide a detailed price quote, establish a formal website design contract, and collect a non-refundable 50% deposit to secure your project in our pipeline."
                                },
                                {
                                    number: "02",
                                    title: "Planning & Strategy",
                                    description: "We conduct a deep dive brainstorming session with you to develop a strategic sitemap, establish clear goals and expectations, and review reference sites together to align our vision."
                                },
                                {
                                    number: "03",
                                    title: "Design Concept",
                                    description: "We submit 3-5 templates or a 2-page custom mock-up for your consideration and request all necessary content including logos, brand guidelines, images, and text materials."
                                },
                                {
                                    number: "04",
                                    title: "Development Initiation",
                                    description: "A dedicated developer is assigned to your project, website development begins, and all provided content is integrated into the initial build."
                                },
                                {
                                    number: "05",
                                    title: "Review & Adjustments",
                                    description: "You'll receive the first look at your website via a development link (desktop version), provide your initial feedback, and a 25% payment is required to proceed with implementing your requested revisions."
                                },
                                {
                                    number: "06",
                                    title: "Revision Implementation & Second Review",
                                    description: "Our team implements your requested changes, conducts an internal quality review, and presents the revised version for your final round of feedback, with additional review options for Professional and Ultimate plans."
                                },
                                {
                                    number: "07",
                                    title: "Mobile Optimization & Quality Assurance",
                                    description: "Once the desktop version is approved, we optimize for mobile responsiveness and conduct comprehensive testing across multiple browsers, devices, screen sizes, and functionality elements."
                                },
                                {
                                    number: "08",
                                    title: "Completion & Handover",
                                    description: "Upon receiving the final 25% payment, we publish your website, migrate it to your hosting server or provide all necessary files, and supply you with complete login credentials and access information."
                                },
                                {
                                    number: "09",
                                    title: "Post-Launch Support",
                                    description: "We offer additional services including website maintenance at $99/month and provide a 7-day review period during which any errors reported will be fixed free of charge."
                                }
                            ].map((item, index) => (
                                <Box
                                    key={index}
                                    bg={cardBgColor}
                                    p={{ base: 6, md: 8 }}
                                    pos="relative"
                                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                                    border="1px solid rgba(58, 134, 255, 0.1)"
                                    _hover={{
                                        transform: "translateY(-5px)",
                                        boxShadow: `0 10px 30px rgba(58, 134, 255, 0.2)`,
                                        _before: {
                                            transform: "scaleX(1)"
                                        }
                                    }}
                                    _before={{
                                        content: '""',
                                        position: 'absolute',
                                        top: '-2px',
                                        left: '-2px',
                                        right: '-2px',
                                        height: '2px',
                                        bgGradient: `linear(to-r, ${primaryColor}, ${secondaryColor})`,
                                        transform: 'scaleX(0)',
                                        transformOrigin: 'left',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    overflow="hidden" >
                                    <Text
                                        pos="absolute"
                                        top="1rem"
                                        right="1rem"
                                        fontSize="4rem"
                                        fontWeight="800"
                                        opacity="0.1"
                                        color={primaryColor}>
                                        {item.number}
                                    </Text>
                                    <Text fontWeight={"bold"} className='sec-text' mb={2}>
                                        [ {item.title} ]
                                    </Text>
                                    <Text color={"whiteAlpha.700"}>{item.description}</Text>
                                </Box>
                            ))}
                    </SimpleGrid>
                </Box>

                {/* Glow Line */}
                <Box
                    h="1px"
                    w="100%"
                    my={8}
                    bgGradient={`linear(to-r, transparent, ${primaryColor}, transparent)`}
                />

                {/* Timeline Section */}
                <Box as="section" mb={16}>
                    <Text as={"h2"} className='pri-text2' mb={4}>
                        Our Design Timeline
                    </Text>
                    <Text maxW="700px" mb={8}>
                        Every project follows a structured timeline to ensure efficient delivery and optimal results.
                    </Text>

                    {/* Timeline with responsive adjustments */}
                    <Box
                        maxW="800px"
                        mx="auto"
                        pos="relative"
                        py={8}
                        _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: { base: "1rem", md: "50%" },
                            width: "2px",
                            bgGradient: `linear(to-b, transparent, ${primaryColor}, ${secondaryColor}, transparent)`,
                            transform: { base: "translateX(0)", md: "translateX(-50%)" }
                        }}
                    >
                        {[
                            {
                                date: "Week 1",
                                title: "Project Kickoff",
                                description: "Initial consultation, requirement gathering, and project planning to set clear objectives and expectations."
                            },
                            {
                                date: "Week 2",
                                title: "Research & Analysis",
                                description: "In-depth market research, competitor analysis, and user need assessment to inform our design strategy."
                            },
                            {
                                date: "Week 3-4",
                                title: "Concept Development",
                                description: "Creation of wireframes, mockups, and prototypes to visualize the user experience and interface design."
                            },
                            {
                                date: "Week 5-7",
                                title: "Design Implementation",
                                description: "Transformation of approved designs into functional components and integration with back-end systems."
                            },
                            {
                                date: "Week 8",
                                title: "Quality Assurance",
                                description: "Comprehensive testing across platforms and devices to ensure performance, accessibility, and usability."
                            },
                            {
                                date: "Week 9",
                                title: "Deployment & Support",
                                description: "Project launch with ongoing support and optimization to ensure continued success and performance."
                            }
                        ].map((item, index) => (
                            <Box
                                key={index}
                                pos="relative"
                                mb={12}
                                width={{ base: "calc(100% - 3rem)", md: "calc(50% - 2rem)" }}
                                ml={{ base: "3rem", md: index % 2 === 0 ? 0 : "calc(50% + 2rem)" }}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    top: "1rem",
                                    left: { base: "-2rem", md: index % 2 === 0 ? "auto" : "-3rem" },
                                    right: { base: "auto", md: index % 2 === 0 ? "-3rem" : "auto" },
                                    width: "1rem",
                                    height: "1rem",
                                    borderRadius: "50%",
                                    bg: primaryColor,
                                    boxShadow: `0 0 10px ${primaryGlow}`
                                }}
                            >
                                <Box
                                    p={6}
                                    bg={cardBgColor}
                                    borderRadius="8px"
                                    boxShadow="0 5px 15px rgba(0, 0, 0, 0.2)"
                                    pos="relative"
                                    _after={{
                                        content: '""',
                                        position: 'absolute',
                                        top: "1rem",
                                        left: { base: "-20px", md: index % 2 === 0 ? "auto" : "-20px" },
                                        right: { base: "auto", md: index % 2 === 0 ? "-20px" : "auto" },
                                        borderWidth: "10px",
                                        borderStyle: "solid",
                                        borderColor: {
                                            base: `transparent ${cardBgColor} transparent transparent`,
                                            md: index % 2 === 0
                                                ? `transparent transparent transparent ${cardBgColor}`
                                                : `transparent ${cardBgColor} transparent transparent`
                                        }
                                    }}
                                >
                                    <Text color={accentColor} fontWeight="600" mb={2}>
                                        [ {item.date} ]
                                    </Text>
                                    <Heading as="h3" fontSize="1.5rem" mb={2}>
                                        {item.title}
                                    </Heading>
                                    <Text>{item.description}</Text>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Glow Line */}
                <Box
                    h="1px"
                    w="100%"
                    my={8}
                    bgGradient={`linear(to-r, transparent, ${primaryColor}, transparent)`} />

                {/* Features Section */}
                <Box as="section" mb={16} pos="relative">
                    <Text as={"h2"} className='pri-text2' mb={4}>
                        Why Choose Our Design Process
                    </Text>
                    <Text maxW="700px" mb={8}>
                        Our approach combines creativity with technical expertise to deliver exceptional results that drive business growth.
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {[
                            {
                                icon: FiInfo,
                                title: "User-Centered Approach",
                                description: "We prioritize user needs and experiences in every design decision."
                            },
                            {
                                icon: FiZap,
                                title: "Performance Optimization",
                                description: "Fast-loading, responsive designs that perform excellently across all devices."
                            },
                            {
                                icon: FiRepeat,
                                title: "Iterative Development",
                                description: "Continuous refinement and improvement based on feedback and testing."
                            },
                            {
                                icon: FiStar,
                                title: "Future-Proof Technology",
                                description: "Implementation of cutting-edge technologies that ensure longevity and scalability."
                            },
                            {
                                icon: FiGrid,
                                title: "Responsive Design",
                                description: "Seamless experiences across all devices and screen sizes."
                            },
                            {
                                icon: FiPackage,
                                title: "Accessibility First",
                                description: "Inclusive design that ensures your digital products are usable by everyone."
                            }
                        ].map((item, index) => (
                            <Flex
                                key={index}
                                align="flex-start"
                                p={3}
                                bg={cardBgColor}
                                borderRadius="8px"
                                borderLeft={`3px solid ${primaryColor}`} >
                                <Flex
                                    w="48px"
                                    h="48px"
                                    mr={4}
                                    align="center"
                                    justify="center"
                                    bgGradient={`linear(135deg, ${primaryGlow}, ${secondaryGlow})`}
                                    borderRadius="50%"
                                    color="white"
                                    fontSize="1.5rem" >
                                    <Icon as={item.icon} />
                                </Flex>
                                <Box flex={1}>
                                    <Text className='sec-text' fontWeight={"bold"} mb={2} color={textColor}>
                                        [ {item.title} ]
                                    </Text>
                                    <Text>{item.description}</Text>
                                </Box>
                            </Flex>
                        ))}
                    </SimpleGrid>
                </Box>

                {/* CTA Section */}
                <Box
                    textAlign="center"
                    py={16}
                    mb={8}
                    w={"100%"}
                    // bg={`radial-gradient(circle at center, ${cardBgColor}, ${darkBgColor})`}
                    >
                    <Text as="h2" className='pri-text' mb={4}>
                        Ready to Start Your Project?
                    </Text>
                    <Text mb={8}>Let's create something amazing together.</Text>
                    <Button1 text={"Get in Touch"} link='/contact'/>
                </Box>
            </Container>

        </Box>
    );
};

export default DesignProcessPage;