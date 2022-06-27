import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/system';
import { Avatar, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Chip from '@/components/Chip';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '@/store/features/appSlice';

const SubMenuCaption = styled(Typography)(({ theme }) => ({
    ...theme.typography.subMenuCaption,
}));

const styles = {
    listIcon: {
        minWidth: '25px',
    },
    listItem: {
        borderRadius: '5px',
        marginBottom: '5px',
    },
    listItemNoBack: {
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '5px',
    },
    errorChip: {
        color: 'error.main',
        backgroundColor: '#ffcdd2',
        marginRight: '20px',
    },
};

const NavItem = (props) => {
    const { item, level } = props;
    const { t } = useTranslation();

    //redux
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.app.setting.isOpen);

    const Icon = item.icon;
    const fontSize = level > 0 ? 'inherit' : 'default';

    const itemIcon = item.icon ? <Icon color="inherit" /> : <ArrowForwardIcon color="inherit" sx={{ fontSize }} />;

    let itemIconClass = !item.icon ? styles.listIcon : styles.menuIcon;

    let itemTarget = '';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: Link, to: item.url };
    if (item.external) {
        listItemProps = { component: 'a', href: item.url };
    }

    return (
        <ListItem
            disabled={item.disabled}
            selected={isOpen === item.id}
            component={Link}
            onClick={() => dispatch(setOpen(item.id))}
            to={item.url}
            target={itemTarget}
            button
            style={{ paddingLeft: level * 16 + 'px' }}
            {...listItemProps}
            sx={level > 1 ? styles.listItemNoBack : styles.listItem}
        >
            <ListItemIcon sx={itemIconClass}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={isOpen === item.id ? 'subtitle1' : 'body1'} color="inherit">
                        {t(item.title)}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <SubMenuCaption variant="caption" display="block" gutterBottom>
                            {t(item.caption)}
                        </SubMenuCaption>
                    )
                }
            />
            {item.chip && (
                <Chip
                    size={item.chip.size}
                    label={item.chip.label}
                    color={item.chip.color}
                    variant={item.chip.variant}
                    sx={item.chip.error && styles.errorChip}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItem>
    );
};

export default NavItem;
