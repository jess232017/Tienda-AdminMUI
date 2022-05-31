import React from 'react';

import { Typography } from '@mui/material';

import useHeaderJwt from '@/services/hooks/useHeaderJwt';
import NavGroup from './navTypes/NavGroup';
import menuItem from '@/components/layout/_nav';
import navRoles from '../navRoles/index';

const MenuList = () => {
    const { jwtHeader } = useHeaderJwt();

    const navItems = navRoles[jwtHeader?.role].items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return navItems;
};

export default MenuList;
