import React from 'react';

import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { List, Typography } from '@mui/material';

import NavItem from './NavItem';
import NavCollapse from './NavCollapse';

const MenuCaption = styled(Typography)(({ theme }) => ({
    ...theme.typography.menuCaption,
}));

const SubMenuCaption = styled(Typography)(({ theme }) => ({
    ...theme.typography.subMenuCaption,
}));

const NavGroup = (props) => {
    const { item } = props;
    const { t } = useTranslation();

    const items = item.children.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <List
            subheader={
                <MenuCaption variant="caption" display="block" gutterBottom>
                    {t(item.title)}
                    {item.caption && (
                        <SubMenuCaption variant="caption" display="block" gutterBottom>
                            {t(item.caption)}
                        </SubMenuCaption>
                    )}
                </MenuCaption>
            }
        >
            {items}
        </List>
    );
};

export default NavGroup;
