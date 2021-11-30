
import React from "react";

import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';

import DeskInput from 'src/common/global/control/desktop/DeskInput';
import DeskHelper from 'src/common/global/control/desktop/DeskHelper';

const Input = ({name, label, control, type="text", error=false, helperText=""}) => {
    const matches = useMediaQuery('(max-width:600px)');

    if(matches){
        return(
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <TextField required
                        {...field} 
                        fullWidth
                        type={type}
                        label={label}
                        error={error}
                        helperText={helperText}
                    />
                )}
            />
        )
    }

    return(
        <FormControl 
            variant="standard" 
            fullWidth
            error={error}
        >
            <InputLabel shrink 
                htmlFor={name}
                sx={{fontWeight: 600, fontSize: "1.15rem"}}
                error={error}
            >
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <DeskInput
                            {...field} 
                            type={type}
                            fullWidth
                            error={error}
                            color={error ? 'error' : 'primary'}
                        />
                        <DeskHelper>{helperText}</DeskHelper>
                    </>
                )}
            />
            
        </FormControl>
    )
};

export default Input;