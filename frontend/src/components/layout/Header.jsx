import { Box, Flex, HStack, Link as ChakraLink } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Button1 from '../buttons/Button1';
import MenuIcon from '../icons/MenuIcon';
import Menu from './Menu';
import { useMenu } from './MenuProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '@/features/auth/authApiSlice';
import Button2 from '../buttons/Button2';
import useAuth from '@/hooks/useAuth';

const DASH_REGEX = /^\dash(\/)?$/

const Header = () => {
    const pathname = useLocation()
    const navigate = useNavigate()
    const {isLoggedIn} = useAuth()

    const [sendLogout, {isLoading, isSuccess, isError, error}] = useSendLogoutMutation()

    useEffect(() => {
        // console.log("Logout Success:", isSuccess);
        if (isSuccess.message == "Logout Successful") navigate("/"); // ✅ Now this will work
    }, [isSuccess, isLoading, navigate]);
    

    const handleLogout = async () => {
        const data = await sendLogout()
        if (data.data.message === "Logout successful") {
            navigate("/")
        }
    }

    const logoutBtn = isLoggedIn && (
        <Button2 text={"Logout"} func={handleLogout} />
    )
 

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const { menuOpen, handleMenuIcon } = useMenu()

    return (
        <header>
            <MenuIcon menuOpen={menuOpen} handleMenuIcon={handleMenuIcon} />
            {menuOpen && <Menu />}
            <Flex
                h={"90px"}
                position={"fixed"}
                maxW="100%"
                w="100%"
                bg={isScrolled ? "#1A1A1A" : "transparent"}
                transition="background-color 0.2s ease-in-out"
                align="center"
                pl={{base: "30px", lg: "50px"}}
                pr={{base: "70px", lg: "80px"}}
                zIndex={8} >

                <HStack w="100%" justifyContent={"space-between"}>
                    <div>
                        <Link to={"/"}>
                            <img src="/logo.png" width={"70px"} alt="Logo" />
                        </Link>
                    </div>
                    <HStack >
                        <Flex gap={"10px"} display={{ base: "none", lg: "flex" }}>
                            <ChakraLink _hover={{ textDecoration: "none" }} as="a" href="/#contact">
                                <Button1 text={"Contact Me"} />
                            </ChakraLink>
                            {logoutBtn}
                        </Flex>
                    </HStack>
                </HStack>
            </Flex>
        </header>
    );
};

export default React.memo(Header);
