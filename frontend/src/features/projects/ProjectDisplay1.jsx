import { selectAllProjects, selectProjectById, useGetProjectsQuery } from "@/features/projects/projectsApiSlice";
import { Flex, Text, VStack, Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useMemo, useCallback } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

// Custom hook for parallax animation calculations
const useParallaxAnimation = (ref) => {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    // Unified parallax effect
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return { yParallax };
};

const ProjectDisplay1 = ({ title, img, tags, projectId }) => {

    const { project } = useGetProjectsQuery("projectsList", {
        selectFromResult: ({ data }) => ({
            project: data?.entities[projectId]
        }),
    })

    const ref = useRef(null);

    // Use custom animation hook
    const { yParallax } = useParallaxAnimation(ref);

    console.log(project)
    // Memoize project title and technologies
    const projectTitle = useMemo(() =>
        project?.title?.toUpperCase(),
        [project?.title]
    );

    const projectTechnologies = useMemo(() =>
        project?.technologies || [],
        [project?.technologies]
    );

    return (
        <VStack mb={"10px"} spacing={"40px"} ref={ref} position="relative">
            {/* Single Motion Wrapper for Image & Text */}
            <motion.div
                style={{
                    y: yParallax,
                    width: "90vw",
                    position: "relative",
                    willChange: "transform" // Optimize animation performance
                }}>
                {/* Parallax Image Container */}
                <Box position="relative" width="100%" height="50vh" overflow="hidden">
                    {/* Overlay with Blur Effect */}
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        bg="rgba(0, 0, 0, 0.5)"
                        backdropFilter="blur(3px)"
                        zIndex="1" />

                    {/* Background Image */}
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        backgroundImage={`url(${`/projectsImgs/${project?.image}`})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        zIndex="0" />

                    {/* Project Title & Tags */}
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="flex-end"
                        justifyContent="flex-end"
                        p="20px"
                        zIndex="2">
                        <Flex flexDir="column">
                            <Link to={`/projects/${projectId}`}>
                                <Text
                                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                                    className="pri-text"
                                    fontSize={{ base: "30px", md: "40px" }}
                                    textAlign="end"
                                    color="white">
                                    {projectTitle}
                                </Text>
                            </Link>

                            {/* Project Tags */}
                            <Flex justifyContent="flex-end" gap="10px" wrap="wrap">
                                {projectTechnologies.map((tech, index) => (
                                    <Text
                                        color={"whiteAlpha.800"}
                                        key={`${project?.id}-${index}-pd`}
                                        className="sec-text"
                                    >
                                        [{tech}]
                                    </Text>
                                ))}
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </motion.div>
        </VStack>
    );
};

// Export with React.memo for component memoization
export default React.memo(ProjectDisplay1);