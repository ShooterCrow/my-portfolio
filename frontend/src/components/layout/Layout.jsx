import { Box, Container, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  const { pathname } = useLocation()
  return (
    <Container m={0} px={0} maxW={"100%"}>
      <Header />
      <VStack minH={"50vh"} pt={"100px"} align={"stretch"} maxW={"full"} m={0} px={"0"}>
        <Outlet />
      </VStack>
      <Box display={pathname.includes("dashboard") ? "none" : "block"}>
        <Footer />
      </Box>
    </Container>
  )
}

export default Layout
