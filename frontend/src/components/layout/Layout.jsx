import { Container, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <Container m={0} px={0} maxW={"100%"}>
      <Header />
      <VStack mt align={"stretch"} maxW={"full"} m={0} px={"0"}>
        <Outlet />
      </VStack>
      <Footer />
    </Container>
  )
}

export default Layout
