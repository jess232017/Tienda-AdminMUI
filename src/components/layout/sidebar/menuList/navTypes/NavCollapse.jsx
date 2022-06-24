import React from 'react';

import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Typography, ListItem, ListItemIcon, ListItemText, Collapse, List, Chip, Avatar } from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavItem from './NavItem';

const SubMenuCaption = styled(Typography)(({ theme }) => ({
    ...theme.typography.subMenuCaption,
}));

const styles = {
    listItemNoBack: {
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '5px',
    },
    listItem: {
        borderRadius: '5px',
        marginBottom: '5px',
    },
    listIcon: {
        minWidth: '25px',
    },
    errorChip: {
        color: 'error.main',
        backgroundColor: '#ffcdd2',
        marginRight: '5px',
    },
};

const NavCollapse = (props) => {
    const { menu, level } = props;
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);

    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };

    const menus = menu.children.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const Icon = menu.icon;
    const menuIcon = menu.icon ? <Icon /> : <ArrowForwardIcon fontSize={level > 0 ? 'inherit' : 'default'} />;

    let menuIconSx = !menu.icon ? styles.listIcon : styles.menuIcon;

    return (
        <React.Fragment>
            <ListItem
                sx={level > 1 ? styles.listItemNoBack : styles.listItem}
                selected={selected === menu.id}
                button
                onClick={handleClick}
                style={{ paddingLeft: level * 16 + 'px' }}
            >
                <ListItemIcon sx={menuIconSx}>{menuIcon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={selected === menu.id ? 'subtitle1' : 'body1'} color="inherit">
                            {t(menu.title)}
                        </Typography>
                    }
                    secondary={
                        menu.caption && (
                            <SubMenuCaption variant="caption" display="block" gutterBottom>
                                {menu.caption}
                            </SubMenuCaption>
                        )
                    }
                />
                {menu.chip && (
                    <Chip
                        size={menu.chip.size}
                        label={menu.chip.label}
                        color={menu.chip.color}
                        variant={menu.chip.variant}
                        sx={menu.chip.error && styles.errorChip}
                        avatar={menu.chip.avatar && <Avatar>{menu.chip.avatar}</Avatar>}
                    />
                )}
                {open ? <ExpandLess sx={{ fontSize: '1rem' }} /> : <ExpandMore sx={{ fontSize: '1rem' }} />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {menus}
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default NavCollapse;
