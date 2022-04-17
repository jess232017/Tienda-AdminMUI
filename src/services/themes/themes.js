import value from '@/assets/scss/themes-vars';

import { createTheme } from '@mui/material/styles';

import grey from '@mui/material/colors/grey';

const theme = (customization) => {
    let textPrimary;
    let textSecondary;
    let textDark;
    let textHint;
    let background;
    let paper;
    let menuCaption;
    let textInversePrimary;

    if (customization.darkMode) {
        textPrimary = menuCaption = textInversePrimary = value.textDarkPrimary;
        textSecondary = value.textDarkSecondary;
        textDark = value.textDarkDark;
        textHint = value.textHintDark;

        background = value.backgoundDark;
        paper = value.paperDark;
    } else {
        textPrimary = textInversePrimary = menuCaption = value.textPrimary;
        textSecondary = value.textSecondary;
        textDark = value.textDark;
        textHint = value.textHint;

        background = value.backgound;
        paper = value.paper;
    }

    return createTheme({
        direction: customization.rtlLayout ? 'rtl' : 'ltr',
        palette: {
            mode: 'light',
            common: {
                black: value.paperDark,
            },
            primary: {
                light: value.primaryLight,
                main: value.primary,
                dark: value.primaryDark,
                100: value.primary100,
            },
            secondary: {
                light: value.secondaryLight,
                main: value.secondary,
                dark: value.secondaryDark,
            },
            error: {
                light: value.errorLight,
                main: value.error,
                dark: value.errorDark,
            },
            warning: {
                light: value.warningLight,
                main: value.warning,
                dark: value.warningDark,
            },
            info: {
                light: value.infoLight,
                main: value.info,
                dark: value.infoDark,
            },
            success: {
                light: value.successLight,
                main: value.success,
                dark: value.successDark,
            },
            grey: {
                300: value.grey300,
                400: value.grey400,
            },
            bg: {
                100: value.bg100,
            },
            textDark: {
                color: textDark,
            },
            text: {
                primary: textPrimary,
                secondary: textSecondary,
                dark: textDark,
                hint: textHint,
            },
            background: {
                paper: paper,
                default: background,
            },
        },
        typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
            h6: {
                fontWeight: 600,
                color: textSecondary,
                fontSize: '0.8rem',
            },
            h5: {
                fontSize: '1.1rem',
                color: textSecondary,
                fontWeight: 600,
            },
            h4: {
                fontSize: '1.2rem',
                color: textSecondary,
                fontWeight: 500,
            },
            h3: {
                fontSize: '1.5rem',
                color: textDark,
                fontWeight: 600,
            },
            h2: {
                fontSize: '2rem',
                color: textDark,
                fontWeight: 600,
            },
            h1: {
                fontSize: '2rem',
                color: textDark,
                fontWeight: 600,
            },
            subtitle1: {
                fontSize: '0.8rem',
                fontWeight: 500,
                color: textSecondary,
                lineHeight: '1.6em',
            },
            subtitle2: {
                fontSize: '0.8rem',
                fontWeight: 400,
            },
            caption: {
                fontSize: '0.68rem',
                color: textHint,
                fontWeight: 500,
            },
            body1: {
                fontSize: '0.8rem',
                fontWeight: 400,
                lineHeight: '1.643em',
            },
            body2: {
                letterSpacing: '0em',
                fontWeight: 400,
                lineHeight: '1.6em',
            },
            menuCaption: {
                fontSize: '0.68rem',
                fontWeight: 600,
                color: value.primary,
                padding: '5px 15px 5px',
                textTransform: 'uppercase',
                marginTop: '10px',
            },
            subMenuCaption: {
                fontSize: '0.68rem',
                fontWeight: 400,
                color: menuCaption,
                textTransform: 'capitalize',
            },
            subHeading: {
                color: 'red',
            },
            cardTitle: {
                color: value.primary,
                fontSize: '1rem',
            },
            breadcrumbTitle: {
                fontWeight: 500,
                fontSize: '1.rem',
                color: textDark,
            },
        },
        components: {
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        '@media (min-width: 600px)': {
                            minHeight: '58px',
                        },
                    },
                },
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                    },
                },
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        fontWeight: 600,
                        fontSize: '0.875rem',
                    },
                    content: {
                        color: textSecondary,
                        fontWeight: 500,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    elevation1: {
                        boxShadow: '0 4px 6px -2px rgb(0 0 0 / 12%), 0 2px 2px -1px rgb(0 0 0 / 5%)',
                    },
                    rounded: {
                        borderRadius: '10px',
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {},
                },
            },
            MuiCardHeader: {
                styleOverrides: {
                    root: {
                        color: textDark,
                        padding: '21px',
                        '.MuiCardHeader-title': {
                            fontSize: '1rem',
                        },
                        '.MuiCardHeader-subheader': {
                            fontSize: '0.8rem',
                        },
                    },
                },
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        padding: '21px',
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    border: 'none',
                    height: '.5px',
                    margin: 0,
                    flexShrink: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                },
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        fontSize: '1.3rem',
                    },
                },
            },
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        fontSize: '0.75rem',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        padding: '16px 36px 16px 36px',
                        whiteSpace: 'nowrap',
                    },
                    head: {
                        padding: '16px 36px 16px 36px',
                        color: textDark,
                        fontWeight: 600,
                    },
                    paddingCheckbox: {
                        paddingLeft: '36px',
                        position: 'relative',
                    },
                },
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        overflow: 'hidden',
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        color: textInversePrimary,
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        '&.Mui-selected': {
                            color: customization.navType === 'dark' ? value.menuHover : value.primary,
                            backgroundColor: customization.navType !== 'dark' ? value.menuHover : value.primary,
                            '&:hover': {
                                backgroundColor: customization.navType !== 'dark' ? value.menuHover : value.primary,
                            },
                            '& .MuiListItemIcon-root': {
                                color: customization.navType === 'dark' ? value.menuHover : value.primary,
                            },
                        },
                        '&:hover': {
                            color: customization.navType === 'dark' ? value.menuHover : value.primary,
                            '& .MuiListItemIcon-root': {
                                color: customization.navType === 'dark' ? value.menuHover : value.primary,
                            },
                        },
                    },
                    button: {
                        '&:hover': {
                            backgroundColor: customization.navType !== 'dark' ? value.menuHover : value.primary,
                        },
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: '36px',
                        color: textInversePrimary,
                    },
                },
            },
            MUIDataTableSelectCell: {
                styleOverrides: {
                    fixedLeft: {
                        position: 'relative',
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        background: background,
                        //background: '#fbfdfe'
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    colorSecondary: {
                        color: grey[100],
                    },
                    colorPrimary: {
                        color: grey[100],
                    },
                    root: {
                        color: grey[100],
                    },
                    outlined: {
                        color: grey[500],
                    },
                },
            },
            MuiTimelineDot: {
                styleOverrides: {
                    defaultGrey: {
                        background: grey[300],
                    },
                },
            },
            MuiTimelineConnector: {
                styleOverrides: {
                    root: {
                        background: grey[300],
                    },
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    colorDefault: {
                        backgroundColor: value.textHint,
                        color: grey[100],
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: textDark,
                    },
                },
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'contained' },
                        style: {
                            '&:hover': {
                                color: 'white',
                            },
                        },
                    },
                    {
                        props: { variant: 'contained', shadow: false },
                        style: {
                            boxShadow: 'none',
                        },
                    },
                    {
                        props: { variant: 'light' },
                        style: {
                            backgroundColor: '#fff',
                            border: '1px solid #e4e4e4',
                        },
                    },
                    {
                        props: { variant: 'light', size: 'large' },
                        style: {
                            padding: '8px',
                            backgroundColor: '#fff',
                            border: '1px solid #e4e4e4',
                        },
                    },
                ],
                styleOverrides: {
                    root: {
                        fontSize: '0.79rem',
                    },
                },
            },
        },
    });
};

export default theme;
