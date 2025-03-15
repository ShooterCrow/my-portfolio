import { useEffect, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";
import { debounce } from "lodash";

function useScrollAnimations(refs) {
  const { scrollYProgress: scrollYProjects } = useScroll({
    target: refs.projectsRef,
    offset: ["start start", "end start"],
  });

  const backgroundColorProjects = useTransform(scrollYProjects, [0, 1], ["#1A1A1A", "#000"]);
  const titleOpacityProjects = useTransform(scrollYProjects, [0, 0.5, 1], [1, 1, 0]);

  // ✅ Debounce scroll-related updates for performance optimization
  const debouncedScrollHandler = useMemo(
    () =>
      debounce(() => {
        // console.log("Handling scroll optimally");
      }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler);
    return () => {
      window.removeEventListener("scroll", debouncedScrollHandler);
      debouncedScrollHandler.cancel(); // Clean up debounce
    };
  }, [debouncedScrollHandler]);

  return { backgroundColorProjects, titleOpacityProjects };
}

export default useScrollAnimations;
