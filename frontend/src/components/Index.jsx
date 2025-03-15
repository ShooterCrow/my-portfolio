import React, { Suspense, useMemo, useRef } from "react";
const MarqueeSlider1 = React.lazy(() => import('./otherComps/MarqueeSlider1'));
import { Flex, HStack, Text, VStack, Box, Image, Link as ChakraLink } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectDisplay1 from "../features/projects/ProjectDisplay1";
import Testimonials1 from "./Testimonials1";
import Loader from "./otherComps/Loader";
import List1 from "./List1";
import Card1 from "./cards/Card1";
import Button1 from "./buttons/Button1";
import Form1 from "./forms/Form1";
import { selectAllProjects, useGetProjectsQuery } from "@/features/projects/projectsApiSlice";
import useScrollAnimations from "@/hooks/useScrollAnimation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BubbleText from "./otherComps/BubbleText";
import Button2 from "./buttons/Button2";
import { ContactSection } from "@/features/contact/ContactPage";

const MotionBox = motion.create(Box)

const Index = () => {
  const {
    isLoading: isProjectLoading,
    isSuccess: isProjectSuccess,
    isError: isProjectError,
    error: projectError } = useGetProjectsQuery()

  const projects = useSelector(selectAllProjects);

  const projectsList = useMemo(() => {
    if (isProjectLoading) return <Loader />
    if (isProjectError) return <Text className="sec-text" color={""} >Something went wrong, try again</Text>
    if (isProjectSuccess) {
      return projects?.slice(0, 4).map(project => (
        <ProjectDisplay1 key={project.id} projectId={project.id} img={"/me.jpeg"} />
      ));
    }
    return null;
  }, [isProjectLoading, isProjectSuccess, projects?.ids]);

  // Section Refs
  const sectionRefDevelopment = useRef(null);
  const sectionRefProjects = useRef(null);
  const sectionRefTestimonials = useRef(null);

  // Scroll Animations
  const { backgroundColorProjects, titleOpacityProjects } = useScrollAnimations({ sectionRefProjects });

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Small Business Owner",
      text: "Victor and JJWEDEVLAB created a stunning website for my bakery. I’m not tech-savvy, but they made the process so simple and explained everything in plain English. Highly recommend!",
      image: "/images/sarah.jpg"
    },
    {
      name: "James Carter",
      role: "Local Artist",
      text: "I needed a portfolio website to showcase my work, and JJWEDEVLAB delivered beyond my expectations. Victor was patient and guided me through every step. My website looks amazing!",
      image: "/images/james.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "Freelance Writer",
      text: "Victor built a professional blog for me, and I couldn’t be happier. He made sure it was easy for me to update and manage, even though I’m not a tech person. Thank you, JJWEDEVLAB!",
      image: "/images/emily.jpg"
    },
    {
      name: "David Miller",
      role: "Real Estate Agent",
      text: "JJWEDEVLAB designed a website for my real estate business that’s both beautiful and functional. Victor understood exactly what I needed and made the process stress-free.",
      image: "/images/david.jpg"
    },
    {
      name: "Tom Harris",
      role: "Plumber",
      text: "I needed a website for my plumbing business, and JJWEDEVLAB delivered exactly what I wanted. Victor made it easy for me to update my services and contact info. Great job!",
      image: "/images/tom.jpg"
    },
    {
      name: "Chris Wilson",
      role: "Plumbing Contractor",
      text: "Victor created a professional website for my plumbing company. It’s easy to use, and my customers love how simple it is to book appointments online. Highly recommend JJWEDEVLAB!",
      image: "/images/chris.jpg"
    }
  ];

  const testimonialsList = useMemo(() => {
    // if (isProjectLoading) return <Loader />
    // if (isProjectError) return <Text className="sec-text" color={""} >Something went wrong, try again</Text>
    if (true) {
      return testimonials?.slice(0, 4).map((testimonial, i) => (
        <Testimonials1 key={i} name={testimonial.name} role={testimonial.role} text={testimonial.text} image={testimonial.image} />
      ));
    }
    return null;
  }, [testimonials]);

  return (
    <div>
      {/* Banner Section */}
      <section>
        <Flex
          pt={"100px"}
          pb={{ base: "50px", lg: "100px" }}
          minH={{ base: "fit-content", xl: "100vh" }}
          position="relative">
          {/* Image Container (Positioned Absolutely at Bottom-Left) */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            w={{ base: "100%", lg: "60%", xl: "40%" }} // Responsive width
            h={{ base: "100%" }} // Set height to 80vh on lg screens
            display={{ base: "block", md: "block" }} // Hide on small screens
            zIndex={-1} >
            {/* Image Container */}
            <Box position="relative" w="100%" h="100%">
              {/* Image */}
              <Image
                src="/me.webp"
                alt="Profile"
                w="100%"
                h="100%"
                objectFit={{ base: "cover", md: "contain", lg: "cover" }} // Use cover to ensure the image fills the container
                borderRadius="sm"
              />

              {/* Overlay (only visible on md and above) */}
              <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                bg="rgba(19, 19, 19, 0.74)" // Semi-transparent black overlay
                display={{ base: "block", md: "block", lg: "none" }} // Only show on md and above
                borderRadius="sm"
              />
            </Box>
          </Box>

          {/* Content Container (Right Side) */}
          <Box
            display={"flex"}
            alignItems={{ base: "flex-start", lg: "flex-end" }}
            flexDirection={"column"}
            gap={"50px"}
            h={"100%"}
            w={{ base: "100%", lg: "90%" }}
            p={8}>
            <VStack align="start" spacing={12}>
              <h4 fontSize="17px" fontWeight="bold">
                [ WHERE YOUR <br />DIGITAL IDEAS<br /> ARE BROUGHT TO LIFE ]
              </h4>
              <Box
                className="banner-head-text banner-header"
                fontSize={{ base: "90px", md: "120px", lg: "150px", xl: "164px" }}
                lineHeight={{ base: "90px", md: "120px", lg: "150px" }}
                fontFamily={"Anton"}>
                HI THERE, <br />
                <BubbleText text={"I'M VICTOR"} />
              </Box>
            </VStack>
            <Flex justifyContent={"flex-start"}>
              <Flex flexDir={"column"} alignItems="start" gap={3}>
                <h4 fontSize="17px" fontWeight="bold">
                  [ WHAT CAN I DO? ]
                </h4>
                <Text className="sec-text" fontSize={"14px"}>
                  Web Design Services <br />
                  Brand Identity & Branding <br />
                  Creative Graphics Design <br />
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </section>

      {/* Development Journey Section */}
      <section ref={sectionRefDevelopment}>
        <Flex bg={"whiteAlpha.100"} py={{ base: "70px", lg: "100px", xl: "150px" }} flexDir={"column"} justifyContent={"center"} alignItems={"center"} minH={{ base: "fit-content", xl: "100vh" }}>
          <h4>[ THE DEVELOPMENT JOURNEY... ]</h4>
          <Text mt={{ base: "15px", lg: "40px" }} className="primary-color pri-text" textAlign={"center"}>
            VICTOR IS A <br /> FREELANCE DEVELOPER
          </Text>
          <Text className="sec-text" fontSize={"12px"} px={"10px"} textAlign={"end"}>
            Talks about himself in third person sometimes ):
          </Text>
          <Text className="sec-text" w={{ base: "80%", md: "50%" }} my={"40px"} textAlign={"center"}>
            Driven by a passion for creating intuitive and engaging digital experiences, he combines clean code with innovative design to develop fast, responsive, and user-friendly websites. With a strong focus on performance and functionality, he builds scalable web solutions that not only look great but also deliver seamless interactions and lasting impact
          </Text>
          <Button1 link="#contact" useChakraLink={true} text={"Contact Me"} />
        </Flex>
      </section>

      {/* Featured Projects Section */}
      <motion.section ref={sectionRefProjects} style={{ background: backgroundColorProjects, minHeight: "fit-content" }}>
        <Box px={"50px"}>
          <Box w={"fit-content"} position={{ base: "relative", lg: "sticky" }} top={{ base: "0", lg: "150px" }} zIndex={7}>
            <motion.div
              style={{
                opacity: titleOpacityProjects,
              }} >
              <Text className="sec-text" pt={"50px"} fontSize={{ base: "14px", md: "18px", lg: "20px" }}>
                [ ONE STEP AT A TIME... ]
              </Text>
              <Text className="pri-text primary-color" fontSize={{ base: "40px", sm: "60px", md: "80px", lg: "100px" }} lineHeight={{ base: "45px", sm: "65px", md: "85px", lg: "100px" }}>
                FEATURED <br /> PROJECTS
              </Text>
            </motion.div>
          </Box>
          <VStack mt={"-30px"} spacing={10}>
            {projectsList}
          </VStack>
          <Link to={"/projects"}>
            <Flex justifyContent={"flex-end"} zIndex={7} position={"sticky"} py={"15px"}>
              <Text className="primary-color sec-text">View More Projects</Text>
              <ArrowRight />
            </Flex>
          </Link>
        </Box>
      </motion.section>

      {/* Client Testimonials Section */}
      <MotionBox ref={sectionRefTestimonials} minH={{ base: "fit-content", xl: "100vh" }}>
        <Flex flexDir={"column"} px={{ base: "20px", lg: "50px" }} pb={"50px"} pt={"50px"}>
          <MotionBox position={{ base: "relative", lg: "sticky" }} top={{ base: "0", lg: "150px" }} zIndex={7}>
            <Text className="sec-text" pt={"10px"} fontSize={{ base: "14px", md: "18px", lg: "20px" }}>
              [ WHAT OTHER PEOPLE THINK ]
            </Text>
            <Text className="pri-text" fontSize={{ base: "40px", sm: "60px", md: "80px", lg: "100px" }} lineHeight={{ base: "45px", sm: "65px", md: "85px", lg: "100px" }} color="white">
              CLIENT <br /> TESTIMONIALS
            </Text>
          </MotionBox>
          <VStack mt={"15px"}>
            {testimonialsList}
          </VStack>
        </Flex>
      </MotionBox>

      {/* Banner Slide Marquee */}
      <Suspense fallback={<div className="sec-text" >Loading...</div>}>
        <MarqueeSlider1 />
      </Suspense>

      {/* Lists Items */}
      <section>
        <Box py={{ base: "50px", xl: "70px" }} >
          <Text textAlign={"center"} className="pri-text">License and Certifications</Text>
          <List1 />
        </Box>
      </section>

      {/* Blog Items */}
      <section>
        <Flex
          py={{ base: "50px", xl: "70px" }}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          minH={""}>

          <h4>[ STAY UPDATED ]</h4>
          <Text className="primary-color pri-text" textAlign={"center"}>
            BLOGS
          </Text>
          <Card1 />
        </Flex>
      </section>
      <section>
        <ContactSection />
      </section>
    </div>
  );
};

export default React.memo(Index);
