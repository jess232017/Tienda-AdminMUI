import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Chip from 'src/common/chip/Chip';

import useStore from 'src/services/context/sidebar';

const useStyles = makeStyles((theme) => ({
    listIcon: {
        minWidth: '25px',
    },
    listItem: {
        borderRadius: '5px',
        marginBottom: '5px',
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption,
    },
    listItemNoBack: {
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '5px',
    },
    errorChip: {
        color: theme.palette.error.main,
        backgroundColor: '#ffcdd2',
        marginRight: '20px',
    },
}));

const NavItem = (props) => {
    const classes = useStyles();
    const {show, setOpen} = useStore();
    const { item, level } = props;

    const Icon = item.icon;
    const itemIcon = item.icon ? (
        <Icon className={classes.listCustomIcon} color="inherit" />
    ) : (
        <ArrowForwardIcon className={classes.listCustomIcon} color="inherit" fontSize={level > 0 ? 'inherit' : 'default'} />
    );

    let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;

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
            className={level > 1 ? classes.listItemNoBack : classes.listItem}
            selected={show.isOpen === item.id}
            component={Link}
            onClick={() => setOpen(item.id)}
            to={item.url}
            target={itemTarget}
            button
            style={{ paddingLeft: level * 16 + 'px' }}
            {...listItemProps}
        >
            <ListItemIcon className={itemIconClass}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        variant={show.isOpen === item.id ? 'subtitle1' : 'body1'}
                        color="inherit"
                        className={classes.listItemTypography}
                    >
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    className={item.chip.error && classes.errorChip}
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItem>
    );
};

export default NavItem;
