import React, { createContext, useCallback, useContext, useState } from 'react'

const MenuContext = createContext()
export const useMenu = () => useContext(MenuContext)


export const MenuProvider = ({children}) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuIcon = useCallback(() => {
        setMenuOpen(prev => !prev)
    }, [])
  return (
    <MenuContext.Provider value={{menuOpen, handleMenuIcon}}>
        {children}
    </MenuContext.Provider>
  )
}
