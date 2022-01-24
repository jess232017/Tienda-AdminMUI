import * as React from 'react';

import { Controller } from "react-hook-form";

import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';

import DeskInput from '_@/common/global/control/desktop/DeskInput';
import DeskHelper from '_@/common/global/control/desktop/DeskHelper';

const Select = ({name="", label="", control="", items=[], error=false, helperText=""}) => {
    const matches = useMediaQuery('(max-width:600px)');

    if(matches){
        return(
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <MuiSelect
                            {...field} 
                            label={label}
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            {items?.map( ({value, name}) => (
                                <MenuItem key={value} value={value}>{name}</MenuItem>
                            ))}
                        </MuiSelect>
                    )}
                />
            </FormControl>
        )
    }

    return(
        <FormControl variant="standard" 
            fullWidth
        >
            <InputLabel shrink htmlFor={name}
                sx={{fontWeight: 600, fontSize: "1.15rem"}}
            >
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <MuiSelect
                            {...field} 
                            defaultValue=""
                            input={
                                <DeskInput 
                                    fullWidth 
                                    color={error ? 'error' : 'primary'}
                                />
                            }
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            {items?.map( ({value, name}) => (
                                <MenuItem key={value} value={value}>{name}</MenuItem>
                            ))}
                        </MuiSelect>
                        
                        <DeskHelper>{helperText}</DeskHelper>
                    </>
                )}
            />
        </FormControl>
    )
}

export default Select;
