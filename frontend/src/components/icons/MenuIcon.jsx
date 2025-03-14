import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

const MenuIcon = ({menuOpen, handleMenuIcon}) => {

    return (
        <Flex
            position="fixed"
            top="25px"
            right="20px"
            zIndex={10}
            onClick={handleMenuIcon}
            role="button"
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            gap={2}
            direction="column"
            className={`menu-icon ${menuOpen ? 'open' : ''}`}
            padding="10px"
            cursor="pointer" >
            <div className="hamburger-bar bar-1"></div>
            <div className="hamburger-bar bar-2"></div>
            <div className="hamburger-bar bar-3"></div>
        </Flex>
    )
}

export default React.memo(MenuIcon)