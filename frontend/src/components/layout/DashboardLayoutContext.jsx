import React, { createContext, useContext, useEffect, useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

const DashboardLayoutContext = createContext();

export const DashboardLayoutProvider = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    // Use Chakra UI's responsive breakpoint system
    const isMobile = useBreakpointValue({ base: true, md: false });
    const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
    const isDesktop = useBreakpointValue({ base: false, lg: true });

    useEffect(() => {
        // Set initial sidebar state based on screen size
        if (isMobile || isTablet) {
            setSidebarCollapsed(true);
        } else {
            setSidebarCollapsed(false);
        }
    }, [isMobile, isTablet]);

    const toggleSidebar = () => {
        setSidebarCollapsed(prev => !prev);
    };

    const toggleMoreMenu = () => {
        setShowMoreMenu(prev => !prev);
    };

    return (
        <DashboardLayoutContext.Provider value={{ 
            sidebarCollapsed, 
            toggleSidebar,
            isMobile: isMobile || false,
            isTablet: isTablet || false,
            isDesktop: isDesktop || false,
            showMoreMenu,
            toggleMoreMenu
        }}>
            {children}
        </DashboardLayoutContext.Provider>
    );
};

export const useDashboardLayout = () => {
    const context = useContext(DashboardLayoutContext);
    if (!context) {
        throw new Error('useDashboardLayout must be used within a DashboardLayoutProvider');
    }
    return context;
};