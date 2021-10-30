import React, {useState, useEffect} from 'react';
import { makeStyles, Card, CardContent, Typography, Divider } from '@material-ui/core';

import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { useLocation, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
    },
    cardClass: {
        padding: theme.spacing(3),
    },
    cardContent: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: '0 !important',
    },
    divider: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    spacer: {
        marginBottom: theme.spacing(3),
    },
    breadcrumbTitle: {
        fontWeight: 500,
        marginTop: theme.spacing(1),
    },
}));

const Breadcrumbs = (props) => {
    const classes = useStyles();
    const { color, outline, size, title, divider, isCard } = props;
    let cardClass = classes.root;
    if (isCard) {
        cardClass = classes.cardClass;
    }

    const [items, setItems] = useState([])
    const location = useLocation();

    useEffect(() => {
        const paths = location.pathname.split("/");
        paths.shift();
        setItems(paths?.map( value => (
            <Typography variant="subtitle2" color="inherit" className="link-breadcrumb">
                {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
        )));
    }, [location])

    return (
        <Card className={cardClass}>
            <CardContent className={classes.cardContent}>
                <MuiBreadcrumbs>
                    {items}
                </MuiBreadcrumbs>
                {title && (
                    <Typography className={classes.breadcrumbTitle} variant="h3">
                        {title}
                    </Typography>
                )}
                {divider === false && !isCard && <div className={classes.spacer} />}
                {divider !== false && <Divider className={classes.divider} />}
            </CardContent>
        </Card>
    );
};

export default Breadcrumbs;
