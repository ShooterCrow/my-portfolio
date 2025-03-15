import React, { useRef } from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  Text, 
  Heading, 
  SimpleGrid, 
  Icon, 
  Divider,
  Button,
  VStack,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { FaReact, FaNodeJs, FaDatabase, FaServer, FaCode, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiJavascript } from 'react-icons/si';
import ParallaxImage from './otherComps/ParallaxImage';

const About = () => {  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'whiteAlpha.100');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  
  return (
    <Box>
      {/* Hero Section with Parallax */}
      <ParallaxImage 
        imagePath="/me.jpeg"
        height="50vh"
        showOverlay={true}
        showContent={true}
        title="ABOUT ME"
        blurAmount="5px"
      />
      
      <Container maxW="1200px" py={10}>
        <Box position="">
            {/* Introduction Section */}
            <Flex direction="column" align="center" textAlign="center" mb={12}>
              <Heading className="pri-text" mb={6}>
                Victor
              </Heading>
              
              <Text className="sec-text" fontSize={{ base: "xl", md: "2xl" }} mb={4}>
                MERN Stack Developer @ jjwebdevlab
              </Text>
              
              <Text maxW="800px" className="sec-text" fontSize="lg" mb={8}>
                With over 4 years of experience building modern web applications, 
                I specialize in delivering high-quality solutions using the MERN stack.
                My focus is on creating performant, scalable, and user-friendly applications
                that solve real-world problems.
              </Text>
              
              <Divider my={6} />
            </Flex>
            
            {/* Expertise Section */}
            <Box mb={16}>
              <Heading as="h2" className="pri-text" fontSize="2xl" mb={8} textAlign="center">
                MY EXPERTISE
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                <ExpertiseCard 
                  icon={FaReact} 
                  title="Frontend Development" 
                  description="Building responsive, interactive UIs with React, Redux, and modern CSS frameworks."
                  bgColor={cardBg}
                  borderColor={borderColor}
                />
                
                <ExpertiseCard 
                  icon={FaNodeJs} 
                  title="Backend Development" 
                  description="Creating robust server-side applications with Node.js and Express."
                  bgColor={cardBg}
                  borderColor={borderColor}
                />
                
                <ExpertiseCard 
                  icon={FaDatabase} 
                  title="Database Design" 
                  description="Designing and implementing efficient database schemas with MongoDB."
                  bgColor={cardBg}
                  borderColor={borderColor}
                />
                
                <ExpertiseCard 
                  icon={FaServer} 
                  title="API Development" 
                  description="Building RESTful and GraphQL APIs for seamless client-server communication."
                  bgColor={cardBg}
                  borderColor={borderColor}
                />
                
                <ExpertiseCard 
                  icon={FaCode} 
                  title="Full Stack Integration" 
                  description="Connecting all pieces of the application ecosystem for a cohesive user experience."
                  bgColor={cardBg}
                  borderColor={borderColor}
                />
                
                <ExpertiseCard 
                  icon={SiJavascript} 
                  title="Modern JavaScript" 
                  description="Leveraging the latest JavaScript features and patterns for efficient development."
                  bgColor={cardBg}
                  borderColor={borderColor}
                />
              </SimpleGrid>
            </Box>
            
            {/* Tech Stack Section */}
            <Box mb={16}>
              <Heading as="h2" className="pri-text" fontSize="2xl" mb={8} textAlign="center">
                TECH STACK
              </Heading>
              
              <Flex justify="center" wrap="wrap" gap={6}>
                <TechBadge icon={SiMongodb} label="MongoDB" />
                <TechBadge icon={SiExpress} label="Express" />
                <TechBadge icon={FaReact} label="React" />
                <TechBadge icon={FaNodeJs} label="Node.js" />
              </Flex>
            </Box>
            
            {/* Philosophy Section */}
            <Box mb={""} bg={cardBg} p={8} borderRadius="md" boxShadow="md">
              <Heading as="h2" className="pri-text" fontSize="2xl" mb={4} textAlign="center">
                MY APPROACH
              </Heading>
              
              <Text className="sec-text" fontSize="lg" mb={4}>
                I believe in crafting digital experiences that are not only visually appealing but also functionally superior. Every project I undertake follows these core principles:
              </Text>
              
              <VStack align="start" spacing={4} mt={6}>
                <HStack>
                  <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                  <Text className="sec-text" fontWeight="bold">Quality First</Text>
                </HStack>
                <Text className="sec-text" pl={6}>
                  Clean code, thorough testing, and attention to detail ensure the highest quality deliverables.
                </Text>
                
                <HStack>
                  <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                  <Text className="sec-text" fontWeight="bold">User-Centered Design</Text>
                </HStack>
                <Text className="sec-text" pl={6}>
                  Creating intuitive interfaces that prioritize the user experience.
                </Text>
                
                <HStack>
                  <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                  <Text className="sec-text" fontWeight="bold">Performance Optimization</Text>
                </HStack>
                <Text className="sec-text" pl={6}>
                  Building applications that load quickly and run smoothly across all devices.
                </Text>
                
                <HStack>
                  <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                  <Text className="sec-text" fontWeight="bold">Scalable Architecture</Text>
                </HStack>
                <Text className="sec-text" pl={6}>
                  Designing systems that can grow with your business needs.
                </Text>
              </VStack>
            </Box>
            
            {/* Call to Action */}
            {/* <Flex direction="column" align="center" textAlign="center" mb={12}>
              <Heading as="h2" className="pri-text" fontSize="2xl" mb={4}>
                LET'S WORK TOGETHER
              </Heading>
              
              <Text className="sec-text" fontSize="lg" mb={6} maxW="800px">
                I'm currently available for freelance projects, consultations, and collaboration opportunities.
                If you're looking for a developer who can deliver quality results, let's connect.
              </Text>
              
              <Flex gap={4} mt={4}>
                <Button colorScheme="blue" size="lg" as="a" href="/contact">
                  Contact Me
                </Button>
                
                <Button colorScheme="gray" size="lg" as="a" href="/projects">
                  View My Work
                </Button>
              </Flex>
              
              <HStack spacing={4} mt={8}>
                <Button variant="ghost" colorScheme="gray" as="a" href="https://github.com/" target="_blank" aria-label="GitHub">
                  <Icon as={FaGithub} w={6} h={6} />
                </Button>
                
                <Button variant="ghost" colorScheme="gray" as="a" href="https://linkedin.com/" target="_blank" aria-label="LinkedIn">
                  <Icon as={FaLinkedin} w={6} h={6} />
                </Button>
              </HStack>
            </Flex> */}
        </Box>
      </Container>
    </Box>
  );
};

// Expertise Card Component
const ExpertiseCard = ({ icon, title, description, bgColor, borderColor }) => {
  return (
    <Box 
      p={6} 
      borderRadius="md" 
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "md"
      }}
    >
      <Flex direction="column" align="center" textAlign="center">
        <Icon as={icon} w={12} h={12} color="blue.500" mb={4} />
        <Text className="sec-text" fontWeight={"bold"} fontSize="xl" mb={3}>[ {title} ]</Text>
        <Text className="sec-text">{description}</Text>
      </Flex>
    </Box>
  );
};

// Tech Badge Component
const TechBadge = ({ icon, label }) => {
  return (
    <Flex 
      direction="column" 
      align="center" 
      p={4} 
      borderRadius="md" 
      transition="all 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Icon as={icon} w={16} h={16} color="blue.500" mb={2} />
      <Text className="sec-text" fontWeight="bold">{label}</Text>
    </Flex>
  );
};

export default About;