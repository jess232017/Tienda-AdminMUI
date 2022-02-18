
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from '@mui/material/styles';

const DeskInput = styled(InputBase)(({ theme }) => ({
    fontSize: '1rem',
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputAdornment-root': {
        marginRight: -40,
        zIndex: 1,
    },
    '& .MuiInputBase-input': {
        color: "rgb(17 24 39/1)",
        fontSize: ".775rem",
        lineHeight: "1.25rem",
        padding: ".5rem",
        backgroundColor: "rgb(249 250 251/1)",
        borderRadius: ".3rem",
        display: "block",
        width: "100%",
        border: "1px solid rgb(209 213 219/ 1)",
        '&:active, &:focus': {
            border: "1px solid rgb(63 131 248/1);",
            boxShadow: "0 0 0 0 #fff, 0 0 0 1px rgb(63 131 248), 0 0 #0000",
            outline: "2px solid transparent",
            outlineOffset: 2,
        }
    },
    '&.MuiInputBase-colorError': {
        '& .MuiInputBase-input': {
            border: '1px solid #ff413a',
            '&:focus': {
                borderRadius: 4,
                boxShadow: `${alpha('#ff413a', 0.25)} 0 0 0 0.2rem`,
                borderColor: '#ff413a',
            },
        },
    },
    ' .MuiSvgIcon-root': {
        marginRight: 10,
    }
}));

export default DeskInput;